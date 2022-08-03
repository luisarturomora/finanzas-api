import { IUser } from '../security/user.interface';
import { ISetting } from '../administration/setting.interface';
import { IAccount } from '../configuration/account.interface';
import { IDocumentType } from './document.type.interface';


export interface IDebitNoteType{
    _id: string;
    description: string;
    account: IAccount;
    document_type: IDocumentType;

    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}