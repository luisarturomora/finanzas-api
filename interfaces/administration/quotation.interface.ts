import { IUser } from '../security/user.interface';
import { IItem } from './item.interface';
import { ISetting } from './setting.interface';
import { IClient } from './client.interface';
import { IOffice } from '../configuration/office.interface';
import { ICurrency } from './currency.interface';
import { IAccount } from '../configuration/account.interface';
import { IInvoiceType } from '../configuration/invoice.type.interface';
import { IInvoice } from './invoice.interface';

export interface IQuotation {
    _id: string;
    client:IClient;
    date:Date;
    code: string;
    items: Array<IItem>;

    currency: ICurrency;
    
    note: string;

    type: IInvoiceType;
    account: IAccount;

    status: String;
    office: IOffice;
    
    invoices: IInvoice[];

    setting: ISetting;
    create_date: Date;
    create_user: IUser;

    total_itbis: number;
    total_discount: number;
    total_value: number;
    sub_total_value: number;
    total_quantity: number;
}
