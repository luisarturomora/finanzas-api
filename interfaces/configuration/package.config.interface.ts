import { IUser } from '../security/user.interface'
import { IItem } from '../administration/item.interface'
import { ISetting } from '../administration/setting.interface'
import { IOffice } from '../configuration/office.interface'

export interface IPackageConfig{
    _id: string;
    
    code: string;
    description: string;
    item: IItem;
    items: Array<IItem>;
    office: IOffice;

    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}

