import { ISetting } from "./setting.interface";
import { IUser } from "../security/user.interface";
import { IPurchase } from "./purchase.interface";
import { IProvider } from "./provider.interface";

export interface IPaymentRequest{
    _id: string;
    code: String;
    date: Date;
    purchase: IPurchase;
    provider: IProvider;
    note: String;
    value: number;

    setting: ISetting;
    create_date: Date;
    create_user: IUser;
};