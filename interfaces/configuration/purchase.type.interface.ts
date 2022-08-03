import {IUser } from '../security/user.interface';
import { IField } from '../configuration/field.interface';
import { IAccount } from '../configuration/account.interface';
import { ISetting } from '../administration/setting.interface';
import { IDocumentType } from './document.type.interface';


export interface IPurchaseType{
    _id: string;
    name: string;
    description: string;
    fields: Array<IField>;
    account: IAccount;
    document_type: IDocumentType;
    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}
