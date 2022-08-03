import { IUser } from '../security/user.interface';
import { ISetting } from '../administration/setting.interface';
import { INcfType } from '../configuration/ncf.type.interface';

export interface INcf{
    _id: string;
    type: INcfType;
    status: string;
    sequential: number;
    serie: string;
    end_date?: Date;
    
    setting: ISetting;
    create_date:Date;
    create_user:IUser;
}