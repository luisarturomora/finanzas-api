"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var module_schema_1 = require("../schemas/security/module.schema");
var widget_schema_1 = require("../schemas/security/widget.schema");
var role_schema_1 = require("../schemas/security/role.schema");
var user_schema_1 = require("../schemas/security/user.schema");
var setting_schema_1 = require("../schemas/administration/setting.schema");
var base_model_1 = require("../models/base.model");
var role_option_1 = require("./option_modules/role_option");
var home_option_1 = require("./option_modules/home_option");
var field_option_1 = require("./option_modules/field_option");
var client_option_1 = require("./option_modules/client_option");
var admin_option_1 = require("./option_modules/admin_option");
var module_option_1 = require("./option_modules/module_option");
var user_option_1 = require("./option_modules/user_option");
var employee_option_1 = require("./option_modules/employee_option");
var payment_method_option_1 = require("./option_modules/payment_method_option");
var provider_option_1 = require("./option_modules/provider_option");
var office_option_1 = require("./option_modules/office_option");
var ncf_option_1 = require("./option_modules/ncf_option");
var item_option_1 = require("./option_modules/item_option");
var invoice_option_1 = require("./option_modules/invoice_option");
var account_option_1 = require("./option_modules/account_option");
var currency_option_1 = require("./option_modules/currency_option");
var invoice_type_option_1 = require("./option_modules/invoice_type_option");
var document_type_option_1 = require("./option_modules/document_type_option");
var convertion_rate_option_1 = require("./option_modules/convertion_rate_option");
var package_config_option_1 = require("./option_modules/package_config_option");
var box_option_1 = require("./option_modules/box_option");
var position_option_1 = require("./option_modules/position_option");
var stock_option_1 = require("./option_modules/stock_option");
var tax_option_1 = require("./option_modules/tax_option");
var invoice_recurrency_option_1 = require("./option_modules/invoice_recurrency_option");
var purchase_type_option_1 = require("./option_modules/purchase_type_option");
var utils_1 = require("../utils/utils");
var credit_note_option_1 = require("./option_modules/credit_note_option");
var debit_note_option_1 = require("./option_modules/debit_note_option");
var purchase_option_1 = require("./option_modules/purchase_option");
var quotation_option_1 = require("./option_modules/quotation_option");
var account_type_option_1 = require("./option_modules/account.type.option");
var account_widgets_1 = require("./option_widgets/account.widgets");
var workflow_option_1 = require("./option_modules/workflow_option");
var config = utils_1.Config(), dbConfig = config['dbConfig'];
var application_widgets = account_widgets_1.AccountWidgets.slice();
var application_modules = account_option_1.AccountOptions.concat(admin_option_1.AdminOptions, box_option_1.BoxOptions, client_option_1.ClientOptions, convertion_rate_option_1.ConvertionRateOptions, credit_note_option_1.CreditNoteOptions, currency_option_1.CurrencyOptions, debit_note_option_1.DebitNoteOptions, document_type_option_1.DocumentTypeOptions, employee_option_1.EmployeeOptions, field_option_1.FieldOptions, home_option_1.HomeOptions, invoice_option_1.InvoiceOptions, invoice_type_option_1.InvoiceTypeOptions, item_option_1.ItemOptions, module_option_1.ModuleOptions, ncf_option_1.NcfOptions, office_option_1.OfficeOptions, package_config_option_1.PackageConfigOptions, payment_method_option_1.PaymentMethodOptions, position_option_1.PositionOptions, provider_option_1.ProviderOptions, role_option_1.RoleOptions, invoice_recurrency_option_1.InvoiceRecurrencyOptions, purchase_option_1.PurchaseOptions, purchase_type_option_1.PurchaseTypeOptions, stock_option_1.StockOptions, tax_option_1.TaxOptions, user_option_1.UserOptions, quotation_option_1.QuotationOptions, account_type_option_1.AccountEntryOptions, workflow_option_1.WorkflowOptions);
var application_setting = {
    "name": "Finanzas",
    "description": "",
    "logo": 'assest/images/logo.png'
};
var application_role = {
    "name": "Administrador",
    "description": "USUARIO ADMINISTRADOR",
    "actived": true
};
var application_user = {
    "name": "admin",
    "last_name": "admin",
    "user_name": "admin",
    "password": "63ebdc9c353b0ec1",
    "status": "Activo",
    roles: []
};
var runScript = function () { return __awaiter(_this, void 0, void 0, function () {
    var user, pwd, url, moduleModel_1, widgetModel_1, settingModel, rolModel, moduleRequests_1, widgetRequests_1, setting_1, userModel, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                user = dbConfig['user'], pwd = dbConfig['password'], url = "mongodb://" + dbConfig['host'] + ":" + dbConfig['port'] + "/" + dbConfig['dbName'];
                if (user && pwd) {
                    mongoose.connect(url, { db: { native_parser: true }, user: user, pass: pwd, useNewUrlParser: true });
                }
                else {
                    mongoose.connect(url);
                }
                moduleModel_1 = new base_model_1.BaseModel(module_schema_1.ModuleSchema, 'module'), widgetModel_1 = new base_model_1.BaseModel(widget_schema_1.WidgetSchema, 'widget'), settingModel = new base_model_1.BaseModel(setting_schema_1.SettingSchema, 'setting'), rolModel = new base_model_1.BaseModel(role_schema_1.RoleSchema, 'role'), moduleRequests_1 = [], widgetRequests_1 = [];
                return [4 /*yield*/, settingModel.save(application_setting)];
            case 1:
                setting_1 = _a.sent();
                console.log("Setting added success.");
                userModel = new base_model_1.BaseModel(user_schema_1.UserSchema, 'user');
                application_user.setting = setting_1._id;
                application_user.create_date = new Date();
                return [4 /*yield*/, userModel.save(application_user)];
            case 2:
                application_user = _a.sent();
                console.log("Users added success.");
                application_modules.forEach(function (mod) {
                    mod.setting = setting_1._id;
                    mod.create_date = new Date();
                    mod.create_user = application_user._id;
                    moduleRequests_1.push(moduleModel_1.save(mod));
                });
                return [4 /*yield*/, Promise.all(moduleRequests_1)];
            case 3:
                application_modules = _a.sent();
                console.log("Modules added success.");
                application_widgets.forEach(function (widget) {
                    widget.setting = setting_1._id;
                    widget.create_date = new Date();
                    widget.create_user = application_user._id;
                    widgetRequests_1.push(widgetModel_1.save(widget));
                });
                return [4 /*yield*/, Promise.all(widgetRequests_1)];
            case 4:
                application_widgets = _a.sent();
                console.log("Widget added success.");
                application_role.setting = setting_1._id;
                application_role.create_date = new Date();
                application_role.create_user = application_user._id;
                application_role.modules = application_modules.map(function (mod) { return mod._id; });
                application_role.widgets = application_widgets.map(function (wid) { return wid._id; });
                return [4 /*yield*/, rolModel.save(application_role)];
            case 5:
                application_role = _a.sent();
                console.log("Profiles added success.");
                application_user.roles = [application_role._id];
                return [4 /*yield*/, userModel.update(application_user._id, application_user)];
            case 6:
                application_user = _a.sent();
                console.log("Adding role to User success.");
                process.exit(0);
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.log('Error agregando setting.', error_1);
                process.exit(0);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
runScript();
//# sourceMappingURL=init_script.js.map