import { IUser } from '../security/user.interface'
import { ISetting } from './setting.interface'

export interface ICurrency{
    _id: string;
    name: string;
    plural_name: string;
    code: string;
    symbol: string;
    symbol_native: string;

    rounding: number;
    decimal_digits: number;
    value: number;
    
    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}