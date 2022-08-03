import { InvoiceRecurrencySchema } from '../../schemas/administration/invoice.recurrency.schema';
import { SettingSchema } from '../../schemas/administration/setting.schema'
import { BaseModel } from '../base.model'
import { InvoiceModel } from './invoice.model'
import { readFileSync } from 'fs';
import { join } from 'path'
import { mongo } from 'mongoose';
import { PaymentSchema } from '../../schemas/administration/payment.schema';
import { Utils, Config } from '../../utils/utils';
import { INVOICE_STATUS_ENUM, SERVICE_STATUS_ENUM, COLLECTION_NAME_ENUM } from '../../utils/enums';
import { IPayment } from '../../interfaces/administration/payment.interface';
import { IInvoice } from '../../interfaces/administration/invoice.interface';
import { IInvoiceRecurrency } from '../../interfaces/administration/invoice.recurrency.interface';
import { IField } from '../../interfaces/configuration/field.interface';
import { IUser } from '../../interfaces/security/user.interface';
let schedule = require('node-schedule')

export class InvoiceRecurrencyModel extends BaseModel{
    constructor() {
        super(InvoiceRecurrencySchema, COLLECTION_NAME_ENUM.invoice_recurrency )
        this.generate_invoice();
    }

    async save(recurrency: any) {
        try {
            let recurrencies = await this.filter(
                { "setting": recurrency.setting },
                { number: true }, 
                { number: -1 }, 
            1);
            recurrency.number = (recurrencies.length > 0 ? (recurrencies[0].number + 1) : 1);
            let doc = await super.save(recurrency)
            await this.generation_process(doc._id.toString());
            return doc;
        } catch (error) {
            console.log(error)
            throw new Error(`Error guardando ${this.document_name}`)
        }
    }

    async suspend(_id: string) {
        try {
            await this.model.update({ _id: _id }, { $set: { status: SERVICE_STATUS_ENUM.finished }} );
            return 'Servicio suspendido correctamente';
        } catch (error) {
            console.log(error)
            throw new Error(`Error suspendiendo ${this.document_name}`)
        }
    }

    async update(_id: string, service: any, no_update?: boolean) {
        try {

            let doc = await super.update(service._id, service);
            if (!no_update)
                this.generation_process(service._id.toString())
            return doc;
        } catch (error) {
            console.log(error)
            throw new Error(`Error guardando ${this.document_name}`)
        }
    }

    private total_product_value(items: Array<any>): number {
        let total = 0;
        items.forEach(item => {
            let itbis: Number = item.item.itbis || 0,
                product_value = (item.value.valueOf() * item.quantity.valueOf()),
                product_itbis = product_value * (itbis.valueOf() / 100);
            total += (product_value + product_itbis);
        })
        return total;
    }

    private generate_invoice() {
        let rule = new schedule.RecurrenceRule(),
            config = Config(),
            hour: number = <number>config['invoice_generattion_hour'],
            minute: number = <number>config['invoice_generattion_minute'];
        rule.minute = minute;
        rule.hour = hour;
        schedule.scheduleJob(rule, async () => {
            await this.generation_process();
        });
    }

    public async payment(_id: string, payment: IPayment) {
        let service = await this.get(_id),
            invoiceModel = new InvoiceModel(),
            paymentModel = new BaseModel(PaymentSchema, 'payment'),
            current_date:Date = new Date(),
            payment_value:number = payment.value.valueOf(),
            invoice_ids: string[] = service.invoices.map((i: IInvoice) => { return i._id.toString() }),
            invoices = await invoiceModel.filter({
                _id: { $in: invoice_ids },
                status: { $in: [ INVOICE_STATUS_ENUM.Created, INVOICE_STATUS_ENUM.Payed] }
            }),
            last_generation_date: Date = new Date( service.start_date );
        for( let count:number = 0; count < invoices.length; count++){
            let invoice:IInvoice = invoices[count];// InvoiceService.get_total( invoices[count] );
            if(invoice.status == INVOICE_STATUS_ENUM.Created && payment_value > 0){
                let inv:any = {};
                inv._id = invoice._id;
                inv.code = invoice.code;
                inv.date = invoice.date;
                await invoiceModel.model.update( {_id: invoice._id}, {$set: { status: INVOICE_STATUS_ENUM.Payed}});
                payment.invoices.push( inv );
                payment_value -= invoice['total_value'];   
            }
            last_generation_date = new Date( invoice.date );
        }

        if(invoices.length > 0)
            last_generation_date = Utils.get_next_date(service.frequency_type.toString(), new Date(last_generation_date), service.frequency_value.valueOf());
        while( current_date >= last_generation_date || payment_value > 0){
            let invoice = await this.create_invoice(service, last_generation_date, INVOICE_STATUS_ENUM.Payed);
            invoice = invoice;
            let inv:any = {};
            inv._id = invoice._id;
            inv.number = invoice.number;
            inv.invoice_date = invoice.date;
            await invoiceModel.model.update( {_id: invoice._id}, {$set: { status: INVOICE_STATUS_ENUM.Payed}});
            payment.invoices.push( inv );
            payment_value -= invoice['total_value'];
            service.invoices.push( invoice._id );
            last_generation_date = Utils.get_next_date(service.frequency_type.toString(), new Date(last_generation_date), service.frequency_value.valueOf());
        }
        
        await super.update(service._id, { $set: { invoices: service.invoices } });

        let p = await paymentModel.save(payment);
        return p;
    }

    public async contractPrint(sv: IInvoiceRecurrency) {
        try {
            let path = process.cwd(),
                service: IInvoiceRecurrency = await this.get(sv._id),
                templateData = readFileSync(join(path, `/public/files/${service.setting._id}/templates/service_contract.html`)),
                settingModel = new BaseModel(SettingSchema, 'setting'),
                template: string = templateData.toString();
            let number: string = service.number.toString();
            service.setting = await settingModel.get(service.setting._id)
            while (number.length <= 5) {
                number = '0' + number;
            }
            template = template.replace('{{service_number}}', number)
            template = template.replace('{{company_name}}', service.setting.name)
            /*if (!service.setting.rnc)
                template = template.replace('{{hidde_rnc}}', 'hidden')
            else {
                template = template.replace('{{hidde_rnc}}', '')
                template = template.replace('{{company_rnc}}', service.setting.rnc)
            }*/

           /*template = template.replace(/{{company_address}}/g, service.setting.address.valueOf())
            template = template.replace(/{{representant_name}}/g, service.setting.representant_name.valueOf())*/
            template = template.replace(/{{client_name}}/g, service.client.name.toString())
            template = template.replace(/{{client_last_name}}/g, service.client.last_name.toString())
            template = template.replace(/{{date_day}}/g, new Date(service.create_date).getDate().toString())
            template = template.replace(/{{date_year}}/g, new Date(service.create_date).getFullYear().toString())
            template = template.replace(/{{date_month_string}}/g, new Date(service.create_date).getMonth().toString())
            let fields = service.client.type.fields;
            fields = fields.concat(service.fields);
            fields.filter((f: IField) => {
                return f.show_on_invoice;
            }).sort((f: IField, e: IField) => {
                return (f.order < e.order) ? -1 : 1;
            }).forEach((field: IField) => {
                if (field.type != 'group') {
                    let regexp = new RegExp(field._id.toString(), 'g')
                    template = template.replace(regexp, field.value || '')
                } else {
                    if (field.multiple_instance) {
                        let table_string = '<table><thead><tr>',
                            child_fields = field.fields.filter((f: IField) => {
                                return f.show_on_invoice;
                            }).sort((f: IField, e: IField) => {
                                return (f.order < e.order) ? -1 : 1;
                            });
                        child_fields.forEach((f: IField) => {
                            table_string += `<th>${f.text}</th>`
                        })
                        table_string += `</th></tr></thead><tbody>`;
                        (field.value || []).forEach((value: any) => {
                            table_string += `<tr>`;
                            child_fields.forEach((f: IField) => {
                                let regexp = new RegExp(f._id, 'g')

                                table_string += `<td>${value[f._id]}</td>`;
                                template = template.replace(regexp, value[f._id] || '')
                            })
                            table_string += `</tr>`;
                        })
                        table_string += `</tbody></table>`;

                        let regexp = new RegExp(field._id.toString(), 'g')
                        template = template.replace(regexp, table_string)
                    } else {
                        let child_fields = field.fields.filter((f: IField) => {
                            return f.show_on_invoice;
                        }).sort((f: IField, e: IField) => {
                            return (f.order < e.order) ? -1 : 1;
                        });
                        child_fields.forEach((f: IField) => {
                            let regexp = new RegExp(f._id.toString(), 'g')
                            template = template.replace(regexp, f.value || '')
                        })
                    }
                }
            })
            var production_value: number = this.total_product_value(service.items);

            template = template.replace(/{{production_value}}/g, production_value.toString())

            //template = template.replace(/{{payment_day_string}}/g, writtenNumber( new Date(loan.start_date).getDate(), { lang: 'es' }))

            return template
        } catch (error) {
            console.log(error)
            return 'Error imprimiendo el contrato'
        }
    }

    private async create_invoice(service: IInvoiceRecurrency, last_payment: Date, status: string) {
        let invoice: any = {},
            invoiceModel: InvoiceModel = new InvoiceModel(),
            invoices = await this.filter({ "setting._id": service.setting._id }, { number: true }, { number: -1 }, 1);
        invoice.number = invoices.length > 0 ? (invoices[0].number + 1) : 1;
        invoice.status = status;
        //invoice.print_sale_point = service.setting.print_sale_point;
        invoice.payments = [];
        invoice.client = service.client;
        invoice.invoice_date = new Date(last_payment);
        invoice.create_date = new Date();
        invoice.create_user = <IUser>service.create_user;
        invoice.ncf_type = '02';
        invoice.note = service.note;
        invoice.office = service.office;
        invoice.payment_type = "Credito";
        invoice.items = service.items;
        invoice.setting = service.setting;
        return await invoiceModel.save(invoice);
    }

    private async generation_process(_id?: string) {
        try {
            let params: any = {
                status: SERVICE_STATUS_ENUM.active
            };
            if (_id)
                params._id = new mongo.ObjectId( _id );

            let services = await this.filter(params),
                invoiceModel = new InvoiceModel();
            for (let count = 0; count < services.length; count++) {
                let service: IInvoiceRecurrency = services[count],
                    _ids = service.invoices.map( (i:IInvoice) =>{ return i._id}),
                    invoices:Array<any> = await invoiceModel.filter({ 
                        _id: { $in: _ids}, 
                        status: { $ne: 'Cancelada'} 
                    }, { "date": true }),
                    current_date: Date = new Date(),
                    last_generation_date: Date = new Date(service.start_date);

                {
                    if (invoices.length > 0)
                        last_generation_date = invoices[invoices.length - 1]['date'];

                    last_generation_date = Utils.get_next_date(service.frequency.toString(), last_generation_date, service.frequency.valueOf());
                    while (current_date >= last_generation_date) {
                        let invoice = await this.create_invoice(service, last_generation_date, INVOICE_STATUS_ENUM.Created);
                        service.invoices.push(  invoice )
                        last_generation_date = Utils.get_next_date(service.frequency.toString(), last_generation_date, service.frequency.valueOf());
                    }
                }

                if (service.end_date && service.end_date < current_date)
                    service.status = "Finalizado";
                await this.update(service._id, service, true);
            }
        } catch (e) {
            console.log(e);
        }
    }
}