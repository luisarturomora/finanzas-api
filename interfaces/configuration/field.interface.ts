import { IUser } from '../security/user.interface';
import { ISetting } from '../administration/setting.interface';

export interface IEquation{
    _id: string;
    variables: Array<Object>;
    from_parent: boolean;
    text: string;
}

export interface IOption{
    _id: string;
    label: string;
    value: string;
    parent_value?: string;
}

export interface IField{
    _id:string;
    text:String;
    order:Number;
    instruction:String;
    show_on_create:  Boolean;
    show_on_invoice: Boolean;
    type:String;
    is_calculate: Boolean;
    parent_field_id?: String;
    parent_field_value?: String;
    file_type: String;
    value:any;
    values: Array<any>;
    equation: IEquation;
    multiple_instance: Boolean;
    fields: Array<object>;
    instances: Array<object>;
    options: Array<IOption>;

    create_date: Date;
    create_user: IUser;
    setting: ISetting;
}