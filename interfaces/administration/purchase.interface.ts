import { IUser } from '../security/user.interface'
import { IItem } from './item.interface'
import { ISetting } from './setting.interface'
import { IProvider  } from './provider.interface'
import { IOffice } from '../configuration/office.interface'

import { IPayment } from './payment.interface';
import { IAccount } from '../configuration/account.interface';
import { INcfType } from '../configuration/ncf.type.interface';
import { INcf } from './ncf.interface';
import { IConvertionRate } from './convertion.rate.interface';
import { ICurrency } from './currency.interface';
import { IPurchaseOrder } from './purchase.order.interface'

export interface IPurchase{
    _id: string;
    provider: IProvider;
    date: Date;
    code: string;
    items: Array<IItem>;
    payments: Array<IPayment>;
    payment_type: string;
    
    ncf?: INcf;
    ncf_type: INcfType;
    account:IAccount;
    note: string;
    status: string;
    office: IOffice;
    currency: ICurrency;
    convertion_rate: IConvertionRate;
    
    purchase_order?: IPurchaseOrder;
    rate?: number;

    create_date: Date;
    create_user: IUser;
    setting: ISetting;

    
    total_itbis: number;
    total_discount: number;
    total_value: number;
    sub_total_value: number;
    total_quantity: number;
    payment_restant: number;
    payment_amount: number;
    payment_old: number;
    debit_note_restant: number;
    debit_note_amount: number;
    old_debit_note: number;
}
