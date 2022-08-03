import { IUser } from "./user.interface";
import { ISetting } from "../administration/setting.interface";

export interface IModule{
    _id: string;
    name: string;
    url: string;
    add: boolean;
    edit: boolean;
    delete: boolean;
    print: boolean;
    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}