import {IUser } from '../security/user.interface'

import { IItem } from '../administration/item.interface';
import { ISetting } from '../administration/setting.interface';

export interface IItemCommision{
    _id: string;
    commision: number;
    item: IItem;

    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}