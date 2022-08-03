import { IUser } from '../security/user.interface';
import { ISetting } from '../administration/setting.interface';
import { IWorkflow } from './workflow.interface';
import { IWorkflowProcess } from './workflow.process.interface';
import { IManualEntry } from '../administration/manual.entry.interface';


export interface IApproveProcess{
    number: number;
    workflow: IWorkflow;
    workflow_process: IWorkflowProcess;
    user: IUser;
    approved?: boolean;
    note?: boolean;
    date?: Date;
    manual_entry?: IManualEntry;
    
    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}