import { BaseModel } from '../base.model';
import { COLLECTION_NAME_ENUM, PAYMENT_STATUS_ENUN, INVOICE_STATUS_ENUM, PURCHASE_STATUS_ENUM } from '../../utils/enums';
import { Utils } from '../../utils/utils';
import { PaymentSchema } from '../../schemas/administration/payment.schema';
import { IPayment } from '../../interfaces/administration/payment.interface'
import { startSession, ClientSession } from 'mongoose';
import { InvoiceModel } from './invoice.model';
import { AccountEntryModel } from './account.entry.model';
import { IInvoice } from '../../interfaces/administration/invoice.interface';
import { IPurchase } from '../../interfaces/administration/purchase.interface';
import { ITax } from '../../interfaces/configuration/tax.interface';
import { PurchaseModel } from './purchase.model';

export class PaymentModel extends BaseModel {
    constructor() {
        super(PaymentSchema, COLLECTION_NAME_ENUM.payment)
    }

    async save(payment: IPayment) {
        let session: ClientSession = await startSession()
        await session.startTransaction();
        try {
            let code_prefix = payment.client? 'PC' : 'PP',
            code = await Utils.generate_code(code_prefix, payment.setting, this),
                accountEntryModel = new AccountEntryModel();

            payment.code = code;
            payment.status = PAYMENT_STATUS_ENUN.created;


            let _payment = await super.save(payment);
            payment._id = _payment._id;
            await accountEntryModel.payment_entry(payment);
            
            await this.invoice_entity(payment);

            await this.purchase_entity(payment);

            session.commitTransaction();
            return _payment
        } catch (error) {
            session.abortTransaction();
            console.log(error)
            throw new Error(error);
        }
    }

    private async invoice_entity(payment: IPayment){
        if(payment.invoices.length <= 0)
            return;
        let invoiceModel = new InvoiceModel(),
            accountEntryModel = new AccountEntryModel();

        for (let i: number = 0; i < payment.invoices.length; i++) {
            let invoice:IInvoice = payment.invoices[i];
            if(invoice.payment_restant <= 0){
                invoice.status = INVOICE_STATUS_ENUM.Payed;
            }else{
                invoice.status = INVOICE_STATUS_ENUM.PartialPayment;
            }
            
            await invoiceModel.model.update({
                _id: invoice._id
            }, {
                $set: {
                    status: invoice.status
                }
            });
            invoice.create_user = payment.create_user;
            invoice.note = payment.note;
            invoice.setting = payment.setting;
            invoice.create_date = payment.create_date;
            
            await accountEntryModel.invoice_entry(invoice, false);
            for(let ti:number = 0; ti < payment.taxes.length; ti ++){
                let tax:ITax = payment.taxes[ti];
                tax.rate = invoice.rate;
                if(tax.apply_value){
                   await accountEntryModel.tax_entry( tax, invoice.sub_total_value, invoice, true);
                }else{
                    await accountEntryModel.tax_entry( tax, invoice.total_itbis, invoice, true);
                }
            }

            let current_value = (invoice.sub_total_value + invoice.total_itbis) * invoice.rate,
                invoice_value = invoice.total_value * Utils.convertion(invoice.convertion_rate, invoice.account.currency),
                restant = current_value - invoice_value;

            if( restant != 0){
                let value = restant < 0? (restant * -1) : restant;
                await accountEntryModel.rate_entry(invoice, value, payment, restant > 0);
            }
        }
    }
    
    private async purchase_entity(payment: IPayment){
        if(payment.purchases.length <= 0)
            return;
        let purchaseModel = new PurchaseModel(),
            accountEntryModel = new AccountEntryModel();

        for (let i: number = 0; i < payment.purchases.length; i++) {
            let purchase:IPurchase = payment.purchases[i];
            if(purchase.payment_restant <= 0){
                purchase.status = PURCHASE_STATUS_ENUM.Payed;
            }else{
                purchase.status = PURCHASE_STATUS_ENUM.PartialPayment;
            }
            
            await purchaseModel.model.update({
                _id: purchase._id
            }, {
                $set: {
                    status: purchase.status
                }
            });
            purchase.create_user = payment.create_user;
            purchase.note = payment.note;
            purchase.setting = payment.setting;
            purchase.create_date = payment.create_date;
            
            await accountEntryModel.purchase_entry(purchase, false);

            let current_value = purchase.total_value * purchase.rate,
                purchase_value = purchase.total_value * Utils.convertion(purchase.convertion_rate, purchase.account.currency),
                restant = current_value - purchase_value;

            if( restant != 0){
                let value = restant < 0? (restant * -1) : restant;
                await accountEntryModel.rate_entry(purchase, value, payment, restant < 0);
            }
            for(let ti:number = 0; ti < payment.taxes.length; ti ++){
                let tax:ITax = payment.taxes[ti];
                tax.rate = purchase.rate;
                if(tax.apply_value){
                    await accountEntryModel.tax_entry( tax, purchase.sub_total_value, purchase, false);
                }else{
                    await accountEntryModel.tax_entry( tax, purchase.total_itbis, purchase, false);
                }
            }
        }
    }
}