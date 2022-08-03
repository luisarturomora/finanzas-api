import { IUser } from '../security/user.interface';
import { ISetting } from '../administration/setting.interface';
import { IAccount } from '../configuration/account.interface';
import { IField } from './field.interface';
import { IDocumentType } from './document.type.interface';


export interface IInvoiceType{
    _id: string;
    code: string;
    description: string;
    account: IAccount;
    document_type: IDocumentType;
    
    fields: IField[];

    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}