import { IModule } from "./module.interface";
import { IWidget } from "./widget.interface";
import { IOffice } from "../configuration/office.interface";
import { IUser } from "./user.interface";
import { ISetting } from "../administration/setting.interface";

export interface IRole{
    _id: string;
    name: string;
    description: string;
    actived: boolean;
    modules: Array<IModule>;
    widgets: Array<IWidget>
    offices: Array<IOffice>;
    craete_date: Date;
    create_user: IUser;
    setting: ISetting;
}