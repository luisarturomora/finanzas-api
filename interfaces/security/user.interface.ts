import { IOffice } from '../configuration/office.interface';
import { IRole } from './role.interface';
import { ISetting } from '../administration/setting.interface';
import { ICurrency } from '../administration/currency.interface';

export interface IUser{
    _id: string;
    image?: string;
    email?: string;
    name: string;
    user_name: string;
    last_name: string;
    password: string;

    roles: Array<IRole>;
    offices: Array<IOffice>;
    
    currency?: ICurrency;

    status: string;
    create_date: Date;
    create_user?: IUser;
    setting?: ISetting;

}