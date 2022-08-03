import * as mongoose from 'mongoose';
import { ModuleSchema } from '../schemas/security/module.schema';
import { WidgetSchema } from '../schemas/security/widget.schema';
import { RoleSchema } from '../schemas/security/role.schema';
import { UserSchema } from '../schemas/security/user.schema';
import { SettingSchema } from '../schemas/administration/setting.schema';
import { BaseModel } from '../models/base.model';
import { RoleOptions } from './option_modules/role_option';
import { HomeOptions } from './option_modules/home_option';
import { FieldOptions } from './option_modules/field_option';
import { ClientOptions } from './option_modules/client_option';
import { AdminOptions } from './option_modules/admin_option';
import { ModuleOptions } from './option_modules/module_option';
import { UserOptions } from './option_modules/user_option';
import { EmployeeOptions } from './option_modules/employee_option';
import { PaymentMethodOptions } from './option_modules/payment_method_option';
import { ProviderOptions } from './option_modules/provider_option';
import { OfficeOptions } from './option_modules/office_option';
import { NcfOptions } from './option_modules/ncf_option';
import { ItemOptions } from './option_modules/item_option';
import { InvoiceOptions } from './option_modules/invoice_option';
import { AccountOptions } from './option_modules/account_option';
import { CurrencyOptions } from './option_modules/currency_option';
import { InvoiceTypeOptions } from './option_modules/invoice_type_option';
import { DocumentTypeOptions } from './option_modules/document_type_option';
import { ConvertionRateOptions } from './option_modules/convertion_rate_option';
import { PackageConfigOptions } from './option_modules/package_config_option';
import { BoxOptions } from './option_modules/box_option';
import { PositionOptions } from './option_modules/position_option';
import { StockOptions } from './option_modules/stock_option';
import { TaxOptions } from './option_modules/tax_option';
import { InvoiceRecurrencyOptions } from './option_modules/invoice_recurrency_option';
import { PurchaseTypeOptions } from './option_modules/purchase_type_option';
import { Config } from '../utils/utils';
import { CreditNoteOptions } from './option_modules/credit_note_option';
import { DebitNoteOptions } from './option_modules/debit_note_option';
import { PurchaseOptions } from './option_modules/purchase_option';
import { QuotationOptions } from './option_modules/quotation_option';
import { AccountEntryOptions } from './option_modules/account.type.option';
import { AccountWidgets } from './option_widgets/account.widgets';
import { WorkflowOptions } from './option_modules/workflow_option';


declare var process:any;

let config = Config(),
    dbConfig = config['dbConfig'];

let application_widgets:any[] = [
    ...AccountWidgets
];

let application_modules:any[] = [
    ...AccountOptions,
    ...AdminOptions,
    ...BoxOptions,
    ...ClientOptions,
    ...ConvertionRateOptions,
    ...CreditNoteOptions,
    ...CurrencyOptions,
    ...DebitNoteOptions,
    ...DocumentTypeOptions,
    ...EmployeeOptions,
    ...FieldOptions,
    ...HomeOptions,
    ...InvoiceOptions,
    ...InvoiceTypeOptions,
    ...ItemOptions,
    ...ModuleOptions,
    ...NcfOptions,
    ...OfficeOptions,
    ...PackageConfigOptions,
    ...PaymentMethodOptions,
    ...PositionOptions,
    ...ProviderOptions,
    ...RoleOptions,
    ...InvoiceRecurrencyOptions,
    ...PurchaseOptions,
    ...PurchaseTypeOptions,
    ...StockOptions,
    ...TaxOptions,
    ...UserOptions,
    ...QuotationOptions,
    ...AccountEntryOptions,
    ...WorkflowOptions
]

let application_setting = {
    "name" : "Finanzas",
    "description" : "",
    "logo": 'assest/images/logo.png'
};

let application_role:any = {
    "name" : "Administrador",
    "description" : "USUARIO ADMINISTRADOR",
    "actived" : true
};


let application_user:any = {
    "name" : "admin",
    "last_name" : "admin",
    "user_name" : "admin",
    "password" : "63ebdc9c353b0ec1",
    "status" : "Activo",
    roles: []
}

let runScript = async ()=>{
    try{
        let user = dbConfig['user'],
            pwd = dbConfig['password'],
            url =  `mongodb://${dbConfig['host']}:${dbConfig['port']}/${dbConfig['dbName']}`;
        if(user && pwd ){
            mongoose.connect(url, { db: { native_parser: true }, user: user, pass: pwd, useNewUrlParser: true})
        } else {
            mongoose.connect(url);
        }
        let moduleModel = new BaseModel(ModuleSchema, 'module'),
            widgetModel = new BaseModel(WidgetSchema, 'widget'),
            settingModel = new BaseModel(SettingSchema, 'setting'),
            rolModel = new BaseModel(RoleSchema, 'role'),
            moduleRequests: Array<any> = [],
            widgetRequests: Array<any> = [];

        let setting = await settingModel.save(application_setting);
        console.log(`Setting added success.`);

        let userModel = new BaseModel(UserSchema, 'user');
        application_user.setting = setting._id;
        application_user.create_date = new Date();
        application_user = await userModel.save(application_user);
        console.log(`Users added success.`);

        application_modules.forEach( (mod:any) =>{
            mod.setting = setting._id;
            mod.create_date = new Date();
            mod.create_user = application_user._id;
            moduleRequests.push(moduleModel.save(mod));
        });

        application_modules = await Promise.all(moduleRequests);
        console.log(`Modules added success.`);
        
        application_widgets.forEach( (widget:any) =>{
            widget.setting = setting._id;
            widget.create_date = new Date();
            widget.create_user = application_user._id;
            widgetRequests.push(widgetModel.save(widget));
        });

        application_widgets = await Promise.all(widgetRequests);
        console.log(`Widget added success.`);

        application_role.setting = setting._id;
        application_role.create_date = new Date();
        application_role.create_user = application_user._id;
        application_role.modules = application_modules.map((mod:any) =>{ return mod._id});
        application_role.widgets = application_widgets.map((wid:any) =>{ return wid._id});
        application_role = await rolModel.save(application_role);
        console.log(`Profiles added success.`);
        
        application_user.roles = [application_role._id];
        application_user = await userModel.update(application_user._id, application_user);
        console.log(`Adding role to User success.`);
        process.exit(0);
    }catch(error){
        console.log('Error agregando setting.', error);
        process.exit(0);
    }
}

runScript();
