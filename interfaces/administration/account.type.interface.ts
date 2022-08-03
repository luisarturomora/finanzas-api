import { IUser } from '../security/user.interface'
import { ISetting } from './setting.interface'
import { IField } from "../configuration/field.interface";

export interface IAccountType{
    _id: string;
    description: string;
    origin: string;
    category: string;
    parent?: IAccountType;
    
    fields: IField[];
    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}