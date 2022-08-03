import { IUser } from '../security/user.interface';
import { IItem } from '../administration/item.interface';
import { ISetting } from '../administration/setting.interface';
import { INcf } from '../administration/ncf.interface';
import { IClient } from './client.interface';
import { IOffice} from '../configuration/office.interface';

import { IPayment } from './payment.interface';
import { IEmployee } from './employee.interface';
import { IInvoiceType } from '../configuration/invoice.type.interface';
import { INcfType } from '../configuration/ncf.type.interface';
import { IAcknowledgment } from './acknowledgment.interface'
import { ICurrency } from './currency.interface';
import { IField } from '../configuration/field.interface';
import { IAccount } from '../configuration/account.interface';
import { IQuotation } from './quotation.interface';
import { IConvertionRate } from './convertion.rate.interface';

export interface IInvoice{
    _id: string;

    client:IClient;
    date:Date;
    ncf_type: INcfType;
    ncf?: INcf;
    code: string;
    items: Array<IItem>;
    payments: Array<IPayment>;
    employees: Array<IEmployee>;

    expire_date?: Date;
    account: IAccount;
    type: IInvoiceType;
    fields: IField[ ];
    currency: ICurrency;
    convertion_rate: IConvertionRate;
    rate?: number;
    
    quotation?: IQuotation;

    note: string;
    acknowledment_ids: Array<IAcknowledgment>;
    status: String;
    office: IOffice;

    
    recurrency: boolean;
    frequency?: number;
    recurrency_end?: Date;

    setting: ISetting;
    create_date: Date;
    create_user: IUser;

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