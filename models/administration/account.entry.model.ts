import { BaseModel } from '../base.model';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';
import { AccountEntrySchema } from '../../schemas/administration/account.entry.schema';
import { IInvoice } from '../../interfaces/administration/invoice.interface';
import { IAccountEntry } from '../../interfaces/administration/account.entry.interface';
import { IItem } from '../../interfaces/administration/item.interface';
import { AccountSchema } from '../../schemas/configuration/account.schema';
import { ITax } from '../../interfaces/configuration/tax.interface';
import { IPayment } from '../../interfaces/administration/payment.interface';
import { IPaymentDeposit } from '../../interfaces/administration/payment.deposit.interface';
import { IItemProcess } from '../../interfaces/configuration/item.process.interface';
import { IPurchase } from '../../interfaces/administration/purchase.interface';
import { SettingModel } from './setting.model';
import { Utils } from '../../utils/utils';

export class AccountEntryModel extends BaseModel {
    constructor() {
        super(AccountEntrySchema, COLLECTION_NAME_ENUM.account_entry)
    }

    async save(_entry: IAccountEntry) {
        let entry = await super.save(_entry);
        let accountModel = new BaseModel(AccountSchema, COLLECTION_NAME_ENUM.account),
            balance:number = entry.account.balance || 0;
        if(entry.origin == entry.account.origin){
            balance += entry.amount;
        }else{
            balance -= entry.amount;
        }
        await accountModel.model.updateOne({_id: entry.account._id}, { $set:{ balance: balance}});
        return entry;
    }

    public async invoice_entry(invoice: IInvoice, origin: boolean = true) {
        let entry = <IAccountEntry>{},
            accountModel = new BaseModel(AccountSchema, COLLECTION_NAME_ENUM.account);            

        let account = await accountModel.get(invoice.account._id.toString());
        
        entry.origin = this.get_origin(origin, account.type.origin);
        entry.account = account;
        entry.currency = account.currency;
        entry.amount = invoice.total_value * Utils.convertion( invoice.convertion_rate, account.currency);
        entry.create_date = invoice.create_date;
        entry.create_user = invoice.create_user;
        entry.invoice = invoice;
        entry.note = invoice.note;
        entry.setting = invoice.setting;
        if(entry.amount > 0)
            await this.save(entry);
    }

    public async purchase_entry(purchase: IPurchase, origin: boolean = true) {
        let entry = <IAccountEntry>{},
            accountModel = new BaseModel(AccountSchema, COLLECTION_NAME_ENUM.account);            

        let account = await accountModel.get(purchase.account._id.toString());
        
        entry.origin = this.get_origin(origin, account.type.origin);
        entry.account = account;
        entry.currency = account.currency;
        entry.amount = purchase.total_value * Utils.convertion( purchase.convertion_rate, account.currency);
        entry.create_date = purchase.create_date;
        entry.create_user = purchase.create_user;
        entry.purchase = purchase;
        entry.note = purchase.note;
        entry.setting = purchase.setting;
        if(entry.amount > 0)
            await this.save(entry);
    }

    private get_origin(origin:boolean, type_origin: string):string{
        let curren_origin:string = '';
        if( origin && type_origin == 'Crédito'){
            curren_origin = 'Crédito';
        }else if(origin && type_origin == 'Débito'){
            curren_origin = 'Débito';
        }else if (!origin && type_origin == 'Crédito'){
            curren_origin = 'Débito';
        }else{
            curren_origin = 'Crédito';
        }
        return curren_origin
    }

    public async payment_deposit_entry(deposit: IPaymentDeposit, origin: boolean = true){
        let entry = <IAccountEntry>{},
            accountModel = new BaseModel(AccountSchema, COLLECTION_NAME_ENUM.account);

        let account = await accountModel.get(deposit.account._id.toString());
        entry.origin = this.get_origin(origin, account.type.origin);
        entry.account = account;
        entry.currency = account.currency;
        entry.amount = deposit.value;
        entry.create_date = deposit.create_date;
        entry.create_user = deposit.create_user;
        entry.payment_deposit = deposit;
        entry.note = deposit.note;
        entry.setting = deposit.setting;
        
        if(entry.amount > 0)
            await this.save(entry);
    }

    public async payment_entry(payment: IPayment, origin: boolean = true){
        let entry = <IAccountEntry>{},
            accountModel = new BaseModel(AccountSchema, COLLECTION_NAME_ENUM.account);

        let account = await accountModel.get(payment.account._id.toString());
        entry.origin = this.get_origin(origin, account.type.origin);
        entry.account = account;
        entry.currency = account.currency;
        entry.amount = payment.value;
        entry.create_date = payment.create_date;
        entry.create_user = payment.create_user;
        entry.payment = payment;
        entry.note = payment.note;
        entry.setting = payment.setting;
        
        if(entry.amount > 0)
            await this.save(entry);
    }

    public async item_entry(item: IItem, parent: any, origin: boolean = true){
        let entry = <IAccountEntry>{},
            accountModel = new BaseModel(AccountSchema, COLLECTION_NAME_ENUM.account),
            proccess:IItemProcess;
        if (item.process.length <= 0)
            return;
        item.process.forEach((p:IItemProcess) =>{
            if(p.document_type == parent.type.document_type){
                proccess = p;
            }
        });
        if(!proccess){
            return;
        }
        let account = await accountModel.get(proccess.account.toString());
        entry.origin = this.get_origin(origin, account.type.origin);
        entry.account = account;
        entry.currency = account.currency;
        entry.amount = item.sub_total * Utils.convertion( parent.convertion_rate, account.currency);
        entry.create_date = parent.create_date;
        entry.create_user = parent.create_user;
        entry.item = item;
        entry.note = parent.note;
        entry.setting = parent.setting;
        
        if(entry.amount > 0)
            await this.save(entry);
    }

    public async tax_entry(tax: ITax, item_value: number, parent: any, origin: boolean = true){
        let entry = <IAccountEntry>{},
            accountModel = new BaseModel(AccountSchema, COLLECTION_NAME_ENUM.account),
            itbis: number = item_value * (tax.value / 100);
        let account = await accountModel.get(tax.account.toString());
        entry.origin = this.get_origin(origin, account.type.origin);
        entry.account = account;
        entry.currency = account.currency;
        entry.amount = itbis * (tax.rate || Utils.convertion( parent.convertion_rate, account.currency) );
        entry.create_date = parent.create_date;
        entry.create_user = parent.create_user;
        entry.tax = tax;
        entry.note = parent.note;
        entry.setting = parent.setting;
        
        if(entry.amount > 0)
            await this.save(entry);
        return itbis;
    }
    
    public async rate_entry(invoice: any, amount: number, parent: any, origin: boolean = true){
        let entry = <IAccountEntry>{},
            accountModel = new BaseModel(AccountSchema, COLLECTION_NAME_ENUM.account),
            settingModel = new SettingModel(),
            setting = await settingModel.get( parent.setting);
        let account = await accountModel.get(setting.change_account);
        
        if(!account){
            console.log( "No se ha configurado una cuenta de ganancias o perdidas" );
        }
        entry.origin = this.get_origin(origin, account.type.origin);
        entry.account = account;
        entry.currency = account.currency;
        entry.amount = amount * Utils.convertion( parent.convertion_rate, account.currency);
        entry.create_date = parent.create_date;
        entry.create_user = parent.create_user;
        entry.note = "Ganancia o perdida por cambio";
        entry.setting = parent.setting;
        
        if(entry.amount > 0)
            await this.save(entry);
    }
}