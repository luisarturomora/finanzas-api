import { IUser } from '../security/user.interface';
import { IItem } from './item.interface';
import { ISetting } from './setting.interface';
import { IProvider } from './provider.interface';
import { IOffice } from '../configuration/office.interface';
import { ICurrency } from './currency.interface';
import { IAccount } from '../configuration/account.interface';
import { IPurchaseType } from '../configuration/purchase.type.interface';
import { IPurchase } from './purchase.interface';

export interface IPurchaseOrder {
    _id: string;
    provider:IProvider;
    date:Date;
    code: string;
    items: Array<IItem>;

    currency: ICurrency;
    
    note: string;

    type: IPurchaseType;
    account: IAccount;

    status: String;
    office: IOffice;
    
    purchases: IPurchase[];

    setting: ISetting;
    create_date: Date;
    create_user: IUser;

    total_itbis: number;
    total_discount: number;
    total_value: number;
    sub_total_value: number;
    total_quantity: number;
}
