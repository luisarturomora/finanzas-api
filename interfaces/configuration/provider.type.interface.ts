import {IUser } from '../security/user.interface'
import { IField } from '../configuration/field.interface'
import { ISetting } from '../administration/setting.interface';

export interface IProviderType{
    _id: string;
    name: string;
    description: string;
    fields: Array<IField>;
    
    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}
