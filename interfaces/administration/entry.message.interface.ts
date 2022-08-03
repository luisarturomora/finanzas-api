import { IUser } from '../security/user.interface';
import { ISetting } from './setting.interface';

export interface IAccountEntry{
    _id: string;
    reason: string;
    commnent: string;
    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}
