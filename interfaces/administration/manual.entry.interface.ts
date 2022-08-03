import { IWorkflow } from "../configuration/workflow.interface";
import { IUser } from "../security/user.interface";
import { ISetting } from "./setting.interface";
import { IAccountEntry } from "./account.entry.interface";
import { ICurrency } from "./currency.interface";
import { IDocumentType } from "../configuration/document.type.interface";
import { IAccount } from "../configuration/account.interface";
import { IOffice } from "../configuration/office.interface";

export interface IManualEntry{
    _id: string;
    code: string;
    date: Date;
    note: string;
    currency: ICurrency;
    document_type: IDocumentType;
    inout_account: IAccount;
    workflow?: IWorkflow;
    entries: IAccountEntry[];
    office?: IOffice;
    status: string;
    year?: number;
    month?: number;
    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}