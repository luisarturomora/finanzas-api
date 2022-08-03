import {IUser } from '../security/user.interface'
import { IProviderType } from '../configuration/provider.type.interface'
import { ISetting } from './setting.interface';

export interface IProvider{
    _id: string;
    name: string;
    last_name: string;
    type: IProviderType;

    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}
