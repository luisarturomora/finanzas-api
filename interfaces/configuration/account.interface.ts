import { IUser } from '../security/user.interface'
import { ISetting } from '../administration/setting.interface'
import { IAccountType } from '../administration/account.type.interface';
import { ICurrency } from '../administration/currency.interface';
import { IField } from "../configuration/field.interface";
import { IAccountEntry } from '../administration/account.entry.interface';
import { IOffice } from './office.interface';
import { IWorkflow } from './workflow.interface';

export interface IAccount{
    _id: string;
    code: string;
    name: string;
    color: string;

    type: IAccountType;
    origin: string;
    parent: IAccount
    
    fields: IField[];
    status: string;
    note: string;
    balance: number;
    in_out_account: boolean;
    
    currency: ICurrency;
    workflow?: IWorkflow;

    create_date: Date;
    create_user: IUser;
    setting: ISetting;
    office?: IOffice;

    accounts: IAccount[];
    account_entries: IAccountEntry[];
}
