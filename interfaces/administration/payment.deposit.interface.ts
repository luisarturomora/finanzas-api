import { ISetting } from "./setting.interface";
import { IUser } from "../security/user.interface";
import { IAccount } from "../configuration/account.interface";
import { IPayment } from "./payment.interface";
import { ICurrency } from "./currency.interface";
import { IConvertionRate } from "./convertion.rate.interface";

export interface IPaymentDeposit{
    _id: string;
    code: string;
    date: Date;
    payments: Array<IPayment>;
    account: IAccount;
    note: string;
    status: String;
    value: number;
    currency: ICurrency;
    convertion_rate: IConvertionRate;

    setting: ISetting;
    create_date: Date;
    create_user: IUser;
};