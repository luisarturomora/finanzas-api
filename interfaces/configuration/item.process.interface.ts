import {IUser } from '../security/user.interface'
import { ISetting } from '../administration/setting.interface';
import { IDocumentType } from './document.type.interface';
import { IAccount } from './account.interface';

export interface IItemProcess{
    _id: string;
    document_type: IDocumentType;
    account: IAccount;

    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}