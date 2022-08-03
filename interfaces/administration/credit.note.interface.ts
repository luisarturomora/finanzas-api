import { IClient } from '../administration/client.interface';
import { IInvoice } from '../administration/invoice.interface';
import { INcfType } from '../configuration/ncf.type.interface';
import { ICreditNoteType } from '../configuration/credit.note.type.interface';
import { INcf } from './ncf.interface';
import { IUser } from '../security/user.interface';
import { ISetting } from './setting.interface';
import { IProvider } from './provider.interface';
import { IPurchase } from './purchase.interface';
import { ICurrency } from './currency.interface';
import { IOffice } from '../configuration/office.interface';
import { IItem } from './item.interface';

export interface ICreditNote{
    _id: string;
    note: String;
    code: string;
    date: Date;
    client?: IClient;
    provider?: IProvider;
    invoice?: IInvoice;
    purchase?: IPurchase;
    type: ICreditNoteType;
    status: string;
    ncf_type: INcfType;
    ncf?: INcf;
    items: IItem[];
    currency: ICurrency;
    office: IOffice;

    value: number;
    create_date:Date;
    create_user: IUser;
    setting: ISetting;

    total_itbis: number;
    total_discount: number;
    total_value: number;
    sub_total_value: number;
    total_quantity: number;
    
}