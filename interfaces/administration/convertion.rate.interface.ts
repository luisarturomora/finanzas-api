
import { IUser } from '../security/user.interface'
import { ISetting } from './setting.interface'
import { ICurrency } from "../administration/currency.interface";

export interface IConvertionRate{
    _id: string;
    date: Date;
    currency_from: ICurrency;
    rates: ICurrency[];
    
    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}