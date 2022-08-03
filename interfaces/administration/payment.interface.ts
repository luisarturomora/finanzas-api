
import { IClient } from "./client.interface";
import { IPaymentMethod } from "../configuration/payment.method.interface";
import { ISetting } from "./setting.interface";
import { IProvider } from "./provider.interface";
import { IInvoice } from "./invoice.interface";
import { IPurchase } from "./purchase.interface";
import { IActiveBox } from "../administration/active.box.interface"; 
import { IUser } from "../security/user.interface";
import { IField } from "../configuration/field.interface";
import { IAccount } from "../configuration/account.interface";
import { ICurrency } from "./currency.interface";
import { ITax } from "../configuration/tax.interface";
import { IConvertionRate } from "./convertion.rate.interface";

export interface IPayment{
    _id: string;
    value: number;
    code: string;
    client?: IClient;
    provider?: IProvider;
    date: Date;
    method: IPaymentMethod;
    fields: IField[];
    invoices: Array<IInvoice>;
    purchases: Array<IPurchase>;
    note: string;
    quantity: number;
    box?: IActiveBox;
    taxes: ITax[];

    account: IAccount;
    currency: ICurrency;
    convertion_rate: IConvertionRate;
    
    itbis: number;
    
    status: string;
    
    setting: ISetting;
    create_date: Date;
    create_user: IUser;
};