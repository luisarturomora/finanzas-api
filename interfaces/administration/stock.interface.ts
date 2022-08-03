
import { IItem } from "./item.interface";
import { IOffice } from "../configuration/office.interface";
import { IUser } from "../security/user.interface";
import { ISetting } from "../administration/setting.interface";

export interface IStock{
    _id: string;
    item: IItem;
    quantity:number;
    office: IOffice;
    type: string;
    note: string;
    create_date: Date;
    create_user: IUser;
    settings: ISetting;
}