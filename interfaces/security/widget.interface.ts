import { IUser } from "./user.interface";
import { ISetting } from "../administration/setting.interface";


export interface IWidget{
    _id: string;
    description: string;
    name: string;
    order: number;
    size: string;
    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}