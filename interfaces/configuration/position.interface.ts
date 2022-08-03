import {IUser } from '../security/user.interface'

import { ISetting } from '../administration/setting.interface';
import { IItemCommision } from './item.commission.interface';
import { IField } from '../configuration/field.interface';

export interface IPosition{
    _id: string;
    description: string;
    commission: number;
    salary: number;
    items: Array<IItemCommision>;
    fields: Array<IField>;

    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}
