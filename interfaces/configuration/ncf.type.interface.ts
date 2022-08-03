import { IUser } from "../security/user.interface";
import { ISetting } from "../administration/setting.interface";
import { IDocumentType } from "./document.type.interface";

export interface INcfType{
    _id: string;
    name: string;
    code: string;
    sequence: string;
    type: string;
    document_types: IDocumentType[];
    
    create_date:Date;
    create_user:IUser;
    setting: ISetting;
}