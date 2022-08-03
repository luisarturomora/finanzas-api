import { IUser } from '../security/user.interface';
import { ISetting } from '../administration/setting.interface';
import { IField } from './field.interface';
import { IWorkflow } from './workflow.interface';


export interface IWorkflowProcess{
    _id: string;
    code: string;
    name: string;
    order: number;
    workflow: IWorkflow;
    User: IUser;
    required: boolean;
    
    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}