import { IUser } from "../security/user.interface";
import { ISetting } from "../administration/setting.interface";
import { IField } from "./field.interface";

export interface IOffice{
    _id: string;
    name: string;
    code: string;
    
    fields: Array<IField>;
    create_date: Date;
    create_user: IUser;
    setting: ISetting;
    home: boolean,
    school: string;
}