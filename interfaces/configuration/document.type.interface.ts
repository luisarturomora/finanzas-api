import { IUser } from '../security/user.interface';
import { ISetting } from '../administration/setting.interface';
import { IWorkflow } from './workflow.interface';


export interface IDocumentType{
    _id: string;
    description: string;
    entry_origin: string;
    origin: string;
    account_category: string;
    account_category2: string;
    workflow?: IWorkflow;

    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}