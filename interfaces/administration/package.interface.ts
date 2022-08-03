import {IUser} from '../security/user.interface';
import { ISetting } from './setting.interface';
import { IPackageConfig } from '../configuration/package.config.interface';

export interface IPackage{
    _id: string;
    quantity: number;
    config: IPackageConfig;
    date: Date;
    number: number;
    status: string;
    note: string;

    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}