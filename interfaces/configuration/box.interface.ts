import { IUser } from '../security/user.interface'
import { ISetting } from '../administration/setting.interface'
import { IOffice } from './office.interface'


export interface IBox{
    _id: string;
    name: string;
    office: IOffice;
    status: string;

    create_date: Date;
    create_user: IUser
    setting: ISetting
}
