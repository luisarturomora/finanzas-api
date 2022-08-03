import {IUser } from '../security/user.interface'
import { IField } from '../configuration/field.interface'
import { ISetting } from '../administration/setting.interface';

export interface IPaymentMethod{
    _id: string;
    name: string;
    fields: Array<IField>;
    tickets: Array<IField>;

    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}
