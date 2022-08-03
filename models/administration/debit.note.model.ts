import { DebitNoteSchema } from '../../schemas/configuration/debit.note.schema';
import { startSession, ClientSession } from 'mongoose';
import { BaseModel } from '../base.model';
import { INcf } from '../../interfaces/administration/ncf.interface';
import { IDebitNote } from '../../interfaces/administration/debit.note.interface';
import { Utils } from '../../utils/utils';
import { COLLECTION_NAME_ENUM, PAYMENT_STATUS_ENUN, PURCHASE_STATUS_ENUM, INVOICE_STATUS_ENUM } from '../../utils/enums';
import { IInvoice } from '../../interfaces/administration/invoice.interface';
import { PaymentModel } from './payment.model';
import { InvoiceModel } from './invoice.model';
import { IItem } from '../../interfaces/administration/item.interface';
import { ITax } from '../../interfaces/configuration/tax.interface';
import { AccountEntryModel } from './account.entry.model';
import { PurchaseModel } from './purchase.model';

export class DebitNoteModel extends BaseModel {
    constructor() {
        super(DebitNoteSchema, COLLECTION_NAME_ENUM.debit_note)
    }

    async save(debit_note: IDebitNote) {
        let session: ClientSession = await startSession()
        await session.startTransaction();

        try {
            let code = await Utils.generate_code('DN', debit_note.setting, this);

            debit_note.code = code;
            
            debit_note.ncf = <INcf>await Utils.get_next_ncf(debit_note.ncf_type, debit_note.setting);
            let saved_debit_note = await super.save(debit_note);
            
            if(debit_note.client){
                this.invoice_entity(debit_note);
            }else{
                this.purchase_entity(debit_note);
            }
            session.commitTransaction();
            return saved_debit_note;
        } catch (error) {
            session.abortTransaction();
            console.log(error)
            throw new Error(error);
        }
    }
    
    private async invoice_entity(debit_note: IDebitNote){
        let accountEntryModel = new AccountEntryModel(),
            invoice = debit_note.invoice;
        
        invoice.note = debit_note.note.toString();
        invoice.create_date = debit_note.create_date;
        invoice.create_user = debit_note.create_user;
        invoice.setting = debit_note.setting;
        invoice.items = debit_note.items;
        await accountEntryModel.invoice_entry(invoice);
        for( let i:number = 0; i< invoice.items.length; i++){
            let item:IItem = invoice.items[i];
            await accountEntryModel.item_entry(item, invoice);
            for(let ti:number = 0; ti < item.taxes.length; ti ++){
                let tax:ITax = item.taxes[ti];
                await accountEntryModel.tax_entry( tax, item.sub_total, invoice);
            }
        }
    }
    
    private async purchase_entity(debit_note: IDebitNote){
        let accountEntryModel = new AccountEntryModel(),
            purchase = debit_note.purchase;
        purchase.note = debit_note.note.toString();
        purchase.create_date = debit_note.create_date;
        purchase.create_user = debit_note.create_user;
        purchase.setting = debit_note.setting;
        purchase.items = debit_note.items;
        await accountEntryModel.purchase_entry(purchase);
        
        for(let i:number = 0; i < purchase.items.length; i++){
            let item = purchase.items[i];
            await accountEntryModel.item_entry(item, purchase);
            for( let it: number = 0; it < item.taxes.length; it++){
                let tax: ITax = item.taxes[it];
                await accountEntryModel.tax_entry(tax, item.sub_total, purchase)
            }
        }
    }
}