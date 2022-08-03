import { IUser } from '../security/user.interface'
import { ISetting } from './setting.interface'

import { IBox } from '../configuration/box.interface';
import { IPaymentMethod } from '../configuration/payment.method.interface';

export interface IActiveBox{
    _id: string;
    start_value: number;
    name: string;
    box: IBox;
    payment_methods: IPaymentMethod[];
    
    status: string;
    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}