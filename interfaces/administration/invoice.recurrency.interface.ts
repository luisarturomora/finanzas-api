import { IClient } from './client.interface';
import { IOffice } from '../configuration/office.interface';
import { IItem } from './item.interface';
import { ISetting } from '../administration/setting.interface';
import { IInvoice } from '../administration/invoice.interface';
import { IUser } from '../security/user.interface';
import { IField } from '../configuration/field.interface';
import { IInvoiceType } from '../configuration/invoice.type.interface';
import { INcfType } from '../configuration/ncf.type.interface';
import { IAccount } from '../configuration/account.interface';
import { ICurrency } from './currency.interface';

export interface IInvoiceRecurrency{
    _id: string;

    client: IClient;
    number: number;
    office: IOffice;
    start_date: Date;
    end_date: Date;
    
    type: IInvoiceType;
    ncf_type: INcfType;

    frequency: number;
    
    items: Array<IItem>;
    fields: IField[];
    status: string;
    invoices: Array<IInvoice>;
    note: string;
    
    account: IAccount;
    currency: ICurrency;

    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}
