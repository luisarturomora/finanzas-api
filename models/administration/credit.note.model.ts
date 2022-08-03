import { CreditNoteSchema } from '../../schemas/configuration/credit.note.schema';
import { startSession, ClientSession } from 'mongoose';
import { BaseModel } from '../base.model';
import { INcf } from '../../interfaces/administration/ncf.interface';
import { Utils } from '../../utils/utils';
import { COLLECTION_NAME_ENUM, INVOICE_STATUS_ENUM, PURCHASE_STATUS_ENUM } from '../../utils/enums';
import { AccountEntryModel } from './account.entry.model';
import { ICreditNote } from '../../interfaces/administration/credit.note.interface';
import { IItem } from '../../interfaces/administration/item.interface';
import { ITax } from '../../interfaces/configuration/tax.interface';
import { InvoiceModel } from './invoice.model';
import { PurchaseModel } from './purchase.model';

export class CreditNoteModel extends BaseModel {
    constructor() {
        super(CreditNoteSchema, COLLECTION_NAME_ENUM.credit_note)
    }

    async save(credit_note: any) {
        let session: ClientSession = await startSession()
        let ts = await session.startTransaction();

        try {
            let code = await Utils.generate_code('CN', credit_note.setting, this);

            credit_note.code = code;

            credit_note.ncf = <INcf>await Utils.get_next_ncf(credit_note.ncf_type, credit_note.setting);
            let saved_credit_note = await super.save(credit_note);
            credit_note._id = saved_credit_note._id;
            if(credit_note.client){
                this.invoice_entity(credit_note);
            }else{
                this.purchase_entity(credit_note);
            }

            session.commitTransaction();
            return saved_credit_note;
        } catch (error) {
            session.abortTransaction();
            console.log(error)
            throw new Error(error);
        }
    }
    
    private async invoice_entity(credit_note: ICreditNote){
        let accountEntryModel = new AccountEntryModel(),
            invoice = credit_note.invoice,
            invoiceModel = new InvoiceModel();
        
        if(invoice.total_value <= credit_note.value){
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
        
        invoice.note = (credit_note.note || '').toString();
        invoice.create_date = credit_note.create_date;
        invoice.create_user = credit_note.create_user;
        invoice.setting = credit_note.setting;
        invoice.items = credit_note.items;
        await accountEntryModel.invoice_entry(invoice, false);
        for( let i:number = 0; i< invoice.items.length; i++){
            let item:IItem = invoice.items[i];
            await accountEntryModel.item_entry(item, invoice, false);
            for(let ti:number = 0; ti < item.taxes.length; ti ++){
                let tax:ITax = item.taxes[ti];
                await accountEntryModel.tax_entry( tax, item.sub_total, invoice, false);
            }
        }
    }
    
    private async purchase_entity(credit_note: ICreditNote){
        let accountEntryModel = new AccountEntryModel(),
            purchase = credit_note.purchase,
            purchaseModel = new PurchaseModel();

        
        if(purchase.total_value <= credit_note.value){
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
        
        purchase.note = credit_note.note.toString();
        purchase.create_date = credit_note.create_date;
        purchase.create_user = credit_note.create_user;
        purchase.setting = credit_note.setting;
        purchase.items = credit_note.items;
        await accountEntryModel.purchase_entry(purchase, false);
        
        for(let i:number = 0; i < purchase.items.length; i++){
            let item = purchase.items[i];
            await accountEntryModel.item_entry(item, purchase, false);
            for( let it: number = 0; it < item.taxes.length; it++){
                let tax: ITax = item.taxes[it];
                await accountEntryModel.tax_entry(tax, item.sub_total, purchase, false)
            }
        }
    }
}