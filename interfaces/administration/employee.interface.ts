import {IUser} from '../security/user.interface'
import { IPosition } from '../configuration/position.interface'
import { IItemCommision } from '../configuration/item.commission.interface';
import { ISetting } from './setting.interface';
import { IField } from '../configuration/field.interface';

export interface IEmployee{
    _id: string;
    name: string;
    last_name: string;
    items: Array<IItemCommision>;
    fields: IField[];
    salary: Number;
    position: IPosition;
    commission: number;

    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}