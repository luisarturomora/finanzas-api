import {IUser } from '../security/user.interface';
import { ISetting } from '../administration/setting.interface';
import { IAccount } from './account.interface';


export interface ITax{
    _id: string;
    name: string;
    value: number;
    default: boolean;
    apply_value: boolean;
    account: IAccount;
    rate?: number;

    create_date: Date;
    create_user: IUser;
    setting: ISetting;    
}
