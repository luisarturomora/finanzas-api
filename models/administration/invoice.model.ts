import { InvoiceSchema } from '../../schemas/administration/invoice.schema';
import { NcfSchema } from '../../schemas/administration/ncf.schema';
import { QuotationSchema } from '../../schemas/administration/quotation.schema';
import { StockSchema } from '../../schemas/administration/stock.schema';
import { AcknowledgmentSchema } from '../../schemas/administration/acknowledgment.schema';
import { PackageConfigSchema } from '../../schemas/configuration/package.config.schema';

import { mongo, startSession, ClientSession } from 'mongoose';
import { BaseModel } from '../base.model';
import { IItem } from '../../interfaces/administration/item.interface';
import { COLLECTION_NAME_ENUM, PACKAGE_STATUS_ENUM, QUOTATION_STATUS_ENUM } from '../../utils/enums';
import { IInvoice } from '../../interfaces/administration/invoice.interface';
import { ISetting } from '../../interfaces/administration/setting.interface';
import { IPackage } from '../../interfaces/administration/package.interface';
import { IUser } from '../../interfaces/security/user.interface';
import { PackageModel } from '../administration/package.model';
import { Utils } from '../../utils/utils';
import { AccountEntryModel } from './account.entry.model';
import { ITax } from '../../interfaces/configuration/tax.interface';
import { StockModel } from './stock.model';

export class InvoiceModel extends BaseModel {
    constructor() {
        super(InvoiceSchema, 'invoice')
    }

    async save(invoice: IInvoice) {
        let session: ClientSession = await startSession()
        session.startTransaction();
        try {
            let code = await Utils.generate_code('F', invoice.setting, this),
                accountEntryModel = new AccountEntryModel(),
                stockModel = new StockModel(),
                quotationModel = new BaseModel( QuotationSchema, COLLECTION_NAME_ENUM.quotation);

            invoice.code = code;
            if(invoice.ncf_type)
                invoice.ncf = await Utils.get_next_ncf(invoice.ncf_type, invoice.setting);

            await this.package_generation(invoice.items, invoice.setting, invoice.create_user)
            await stockModel.out_stock(invoice, 'Consepto de facturación');
            if(!!invoice.quotation){
                await quotationModel.model.updateOne({ _id: invoice.quotation }, {
                    $set: { status: QUOTATION_STATUS_ENUM.invoiced }
                });
            }
            let saved_invoice = await super.save(invoice);
            invoice._id = saved_invoice._id;
            
            await accountEntryModel.invoice_entry(invoice);
            for( let i:number = 0; i< invoice.items.length; i++){
                let item:IItem = invoice.items[i];
                await accountEntryModel.item_entry(item, invoice);
                for(let ti:number = 0; ti < item.taxes.length; ti ++){
                    let tax:ITax = item.taxes[ti];
                    await accountEntryModel.tax_entry( tax, item.sub_total, invoice);
                }
            }

            session.commitTransaction();
            return saved_invoice
        } catch (error) {
            session.abortTransaction();
            console.log(error)
            throw new Error(error);
        }
    }

    private async package_generation(items: IItem[], setting: ISetting, user: IUser) {
        let packageConfigModel = new BaseModel(PackageConfigSchema, COLLECTION_NAME_ENUM.package_config),
            packageModel = new PackageModel();

        for( let i:number = 0; i < items.length; i++){
            let item: IItem = items[i];
            let configs = await packageConfigModel.filter({
                item: new mongo.ObjectID(item._id)
            }, {
                office: 1,
                item: 1,
                items: {
                    quantity: 1,
                    _id: 1
                }
            }, null, 0, 1);
            if (configs.length > 0) {
                let config = configs[0],
                pack: any = <IPackage>{};
                pack.quantity = item.quantity;
                pack.config = config;
                pack.date = new Date();
                pack.status = PACKAGE_STATUS_ENUM.created;
                pack.note = "Facturación";
                pack.setting = new mongo.ObjectID(setting.toString());
                pack.create_date = new Date();
                pack.create_user = new mongo.ObjectID(user.toString());

                await packageModel.save(pack);
            }
        }
    }

    async update(_id: string, invoice: any) {
        try {
            if (invoice.status == 'Pre-Factura') {
                let ncfModel = new BaseModel(NcfSchema, 'ncf'),
                    stockModel = new BaseModel(StockSchema, 'stock'),
                    ncfs = await ncfModel.filter({
                        status: 'Activo',
                        type: invoice.ncf_type,
                        $or: [{
                            'setting._id': invoice.setting._id
                        },
                        {
                            'setting._id': new mongo.ObjectId(invoice.setting._id)
                        },
                        {
                            setting: { $exists: false }
                        }],
                        $and: [{
                            $or: [
                                { end_date: null },
                                { end_date: { $exists: false } },
                                { end_date: { $gte: new Date() } }
                            ]
                        }
                        ]
                    }, {}, { sequential: 1 }, 0, 1),
                    invoices = await this.filter({ "setting._id": invoice.setting._id }, { number: true }, { number: -1 }, 0, 1);
                invoice.number = invoices.length > 0 ? (invoices[0].number + 1) : 1;
                if (invoice.ncf_type != '02' && ncfs.length <= 0) {
                    throw new Error(`Se agotaron los NCF del tipo ${invoice.ncf_type}, es necesario agregar una nueva secuencia.`);
                }
                if (ncfs.length > 0)
                    invoice.ncf = ncfs[0];
                let stocks = invoice.products.map((item: any) => {
                    return {
                        item: item,
                        quantity: item.quantity,
                        type: 'out',
                        office: invoice.office,
                        note: 'Consepto de facturación',
                        create_date: invoice.create_date,
                        create_user: invoice.create_user,
                        settings: invoice.setting
                    };
                })
                invoice.status = 'Creada';
                if (invoice.acknowledment_ids.length <= 0)
                    await stockModel.saveMeny(stocks);
                if (invoice.ncf)
                    await ncfModel.update(invoice.ncf._id, { status: 'Usado' })
            }
            return await super.update(invoice._id, invoice);
        } catch (error) {
            console.log(error)
            throw new Error(`Error guardando ${this.document_name}`)
        }
    }

    async from_acknowledgment(ids: Array<string>, user: any) {
        try {
            let acknowlegmentModel = new BaseModel(AcknowledgmentSchema, 'acknowledgment'),
                invoice: any = {},
                acknowlegments = await acknowlegmentModel.filter({ _id: { $in: ids } });

            invoice['create_user'] = acknowlegments[0].create_user;
            invoice.setting = user.setting;
            invoice.create_date = new Date()
            invoice.invoice_date = new Date();
            invoice.client = acknowlegments[0].client;
            invoice.products = [];
            invoice.employees = [];
            invoice.note = `Factura de acuse.`;
            invoice.office = acknowlegments[0].office;
            invoice.status = 'Pre-Factura';
            invoice.acknowledment_ids = ids;
            acknowlegments.forEach((acknowledgment: any) => {
                acknowledgment.products.forEach((item: any) => {
                    let index = -1;
                    if (invoice.products.some((p: IItem, i: number) => {
                        index = i;
                        return p._id == item._id;
                    })) {
                        invoice.products[index].quantity = invoice.products[index].quantity.valueOf() + item.quantity.valueOf();
                    } else {
                        invoice.products.push(item);
                    }
                })
            })
            let invoices = await this.filter({ "setting._id": invoice.setting._id }, { number: true }, { number: -1 }, 0, 1);
            invoice.number = invoices.length > 0 ? (invoices[0].number + 1) : 1;
            var i = await super.save(invoice);
            await acknowlegmentModel.model.update({ _id: { $in: ids } }, { $set: { status: 'Facturado' } });
            return i;
        } catch (error) {
            console.log(error)
            throw new Error(`Error guardando ${this.document_name}`)
        }
    }

    async pending(params: any) {
        try {
            let data: any = { restant: 0, total: 0, invoices: [] };
            let invoices = await super.aggregate(params, null, null, [{
                from: "payments",
                localField: "_id",
                foreignField: "invoices._id",
                as: "payments"
            }]);
            invoices.forEach((invoice: any) => {
                invoice['restant'] = 0;
                invoice['restant'] = invoice.total_value;
                invoice['payments'].forEach((payment: any) => {
                    invoice['restant'] -= payment.value.valueOf();
                })

                if (invoice['restant'] > 0) {
                    data.restant += invoice['restant'];
                    data.total += invoice.total_value;
                    data.invoices.push({
                        _id: invoice._id,
                        restant: invoice['restant'],
                        total: invoice.total_value,
                        payment_type: invoice.payment_type,
                        number: invoice.number,
                        invoice_date: invoice.invoice_date,
                        client: {
                            _id: invoice.client._id,
                            name: invoice.client.name,
                            last_name: invoice.client.last_name
                        }
                    });
                }
            })
            return data;
        } catch (error) {
            console.log(error)
            throw new Error(`Error cargando cuentas por cobrar.`)
        }
    }

    async change_status(_id: string, invoice: any) {
        try {
            return await this.model.update({ _id: _id }, { $set: { status: invoice.status } }, {});
        } catch (error) {
            console.log(error)
            throw new Error(`Error modificando el estado de ${this.document_name}`)
        }
    }
}