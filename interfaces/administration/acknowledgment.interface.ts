import { IClient } from './client.interface';
import { IItem } from './item.interface';
import { IEmployee } from './employee.interface';
import { IOffice } from '../configuration/office.interface';
import { ISetting } from './setting.interface';
import { IUser } from '../security/user.interface';

export interface IAcknowledgment{
    _id: string;
    client: IClient;
    date: Date;
    number: number;
    items: Array<IItem>;
    employees: Array<IEmployee>;
    note: string;
    status: string;
    office: IOffice;

    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}