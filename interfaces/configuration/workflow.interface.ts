import { IUser } from '../security/user.interface';
import { ISetting } from '../administration/setting.interface';
import { IField } from './field.interface';
import { IWorkflowProcess } from './workflow.process.interface';


export interface IWorkflow{
    _id: string;
    code: string;
    name: string;
    description?: string;
    
    fields: IField[];

    create_date: Date;
    create_user: IUser;
    setting: ISetting;

    
    process?: IWorkflowProcess[];
}