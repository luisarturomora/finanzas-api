import { IClient } from './client.interface';
import { IInvoice } from './invoice.interface';
import { INcf } from './ncf.interface';
import { INcfType } from '../configuration/ncf.type.interface';
import { IDebitNoteType } from '../configuration/debit.note.type.interface';
import { IUser } from '../security/user.interface';
import { ISetting } from './setting.interface';
import { IPayment } from './payment.interface';
import { IProvider } from './provider.interface';
import { IPurchase } from './purchase.interface';
import { IItem } from './item.interface';
import { ICurrency } from './currency.interface';
import { IOffice } from '../configuration/office.interface';

export interface IDebitNote{
    note: String;
    date: Date;
    code: string;
    client?: IClient;
    provider?: IProvider;
    invoice?: IInvoice;
    purchase?: IPurchase;
    type: IDebitNoteType;
    status: string;
    ncf_type: INcfType;
    ncf?: INcf;
    value: number;
    
    items: IItem[];
    currency: ICurrency;
    office: IOffice;

    create_date:Date;
    create_user: IUser;
    setting: ISetting;

    total_itbis: number;
    total_discount: number;
    total_value: number;
    sub_total_value: number;
    total_quantity: number;
}