import { IUser } from '../security/user.interface';
import { IField } from './field.interface';
import { ISetting } from '../administration/setting.interface';


export interface IItemType{
    _id: string;
    name: string;
    code: string;
    parent?: IItemType;
    fields: Array<IField>;
    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}