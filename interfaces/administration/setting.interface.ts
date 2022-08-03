import { IAccount } from "../configuration/account.interface";
import { ICurrency } from "./currency.interface";
import { IField } from "../configuration/field.interface";

export interface ISetting{
    _id:string;
    name: string;
    description?: string;
    background: string;
    logo: string;
    email: string;
    phone: string;
    rnc: string;
    change_account?: IAccount;
    currency?: ICurrency;
    office_fields: Array<IField>;

    address: string;
    is_saas: Boolean;
    invoice_message: string;
    payment_message: string;
}
