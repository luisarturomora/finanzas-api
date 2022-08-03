import {IUser } from '../security/user.interface';
import { IClientType } from '../configuration/client.type.interface';
import { ISetting } from './setting.interface';

export interface IClient{
    _id: string;
    name: string;
    last_name: string;
    type: IClientType;
    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}