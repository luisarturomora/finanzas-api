import { IUser } from '../security/user.interface';
import { IItemType } from '../configuration/item.type.interface';
import { ISetting } from '../administration/setting.interface';
import { IItemProcess } from '../configuration/item.process.interface';
import { IField } from '../configuration/field.interface';
import { ITax } from '../configuration/tax.interface';

export interface IItem{
    _id: string;
    name: string;
    note: string;
    code: string;
    value: number;
    item_type: IItemType;
    field: IField[];

    discount_type?: string;
    discount?: number;

    process: IItemProcess[];
    
    quantity?: number;
    taxes: ITax[];
    itbis: Number;
    service: boolean;
    
    create_date: Date;
    create_user: IUser;
    setting: ISetting;

    total_discount: number;
    total_itbis: number;
    sub_total: number;
    total_value: number;
}
