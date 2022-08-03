"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var base_model_1 = require("../base.model");
var enums_1 = require("../../utils/enums");
var account_entry_schema_1 = require("../../schemas/administration/account.entry.schema");
var account_schema_1 = require("../../schemas/configuration/account.schema");
var setting_model_1 = require("./setting.model");
var utils_1 = require("../../utils/utils");
var AccountEntryModel = /** @class */ (function (_super) {
    __extends(AccountEntryModel, _super);
    function AccountEntryModel() {
        return _super.call(this, account_entry_schema_1.AccountEntrySchema, enums_1.COLLECTION_NAME_ENUM.account_entry) || this;
    }
    AccountEntryModel.prototype.save = function (_entry) {
        return __awaiter(this, void 0, void 0, function () {
            var entry, accountModel, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.save.call(this, _entry)];
                    case 1:
                        entry = _a.sent();
                        accountModel = new base_model_1.BaseModel(account_schema_1.AccountSchema, enums_1.COLLECTION_NAME_ENUM.account), balance = entry.account.balance || 0;
                        if (entry.origin == entry.account.origin) {
                            balance += entry.amount;
                        }
                        else {
                            balance -= entry.amount;
                        }
                        return [4 /*yield*/, accountModel.model.updateOne({ _id: entry.account._id }, { $set: { balance: balance } })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, entry];
                }
            });
        });
    };
    AccountEntryModel.prototype.invoice_entry = function (invoice, origin) {
        if (origin === void 0) { origin = true; }
        return __awaiter(this, void 0, void 0, function () {
            var entry, accountModel, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entry = {}, accountModel = new base_model_1.BaseModel(account_schema_1.AccountSchema, enums_1.COLLECTION_NAME_ENUM.account);
                        return [4 /*yield*/, accountModel.get(invoice.account._id.toString())];
                    case 1:
                        account = _a.sent();
                        entry.origin = this.get_origin(origin, account.type.origin);
                        entry.account = account;
                        entry.currency = account.currency;
                        entry.amount = invoice.total_value * utils_1.Utils.convertion(invoice.convertion_rate, account.currency);
                        entry.create_date = invoice.create_date;
                        entry.create_user = invoice.create_user;
                        entry.invoice = invoice;
                        entry.note = invoice.note;
                        entry.setting = invoice.setting;
                        if (!(entry.amount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.save(entry)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccountEntryModel.prototype.purchase_entry = function (purchase, origin) {
        if (origin === void 0) { origin = true; }
        return __awaiter(this, void 0, void 0, function () {
            var entry, accountModel, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entry = {}, accountModel = new base_model_1.BaseModel(account_schema_1.AccountSchema, enums_1.COLLECTION_NAME_ENUM.account);
                        return [4 /*yield*/, accountModel.get(purchase.account._id.toString())];
                    case 1:
                        account = _a.sent();
                        entry.origin = this.get_origin(origin, account.type.origin);
                        entry.account = account;
                        entry.currency = account.currency;
                        entry.amount = purchase.total_value * utils_1.Utils.convertion(purchase.convertion_rate, account.currency);
                        entry.create_date = purchase.create_date;
                        entry.create_user = purchase.create_user;
                        entry.purchase = purchase;
                        entry.note = purchase.note;
                        entry.setting = purchase.setting;
                        if (!(entry.amount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.save(entry)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccountEntryModel.prototype.get_origin = function (origin, type_origin) {
        var curren_origin = '';
        if (origin && type_origin == 'Crédito') {
            curren_origin = 'Crédito';
        }
        else if (origin && type_origin == 'Débito') {
            curren_origin = 'Débito';
        }
        else if (!origin && type_origin == 'Crédito') {
            curren_origin = 'Débito';
        }
        else {
            curren_origin = 'Crédito';
        }
        return curren_origin;
    };
    AccountEntryModel.prototype.payment_deposit_entry = function (deposit, origin) {
        if (origin === void 0) { origin = true; }
        return __awaiter(this, void 0, void 0, function () {
            var entry, accountModel, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entry = {}, accountModel = new base_model_1.BaseModel(account_schema_1.AccountSchema, enums_1.COLLECTION_NAME_ENUM.account);
                        return [4 /*yield*/, accountModel.get(deposit.account._id.toString())];
                    case 1:
                        account = _a.sent();
                        entry.origin = this.get_origin(origin, account.type.origin);
                        entry.account = account;
                        entry.currency = account.currency;
                        entry.amount = deposit.value;
                        entry.create_date = deposit.create_date;
                        entry.create_user = deposit.create_user;
                        entry.payment_deposit = deposit;
                        entry.note = deposit.note;
                        entry.setting = deposit.setting;
                        if (!(entry.amount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.save(entry)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccountEntryModel.prototype.payment_entry = function (payment, origin) {
        if (origin === void 0) { origin = true; }
        return __awaiter(this, void 0, void 0, function () {
            var entry, accountModel, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entry = {}, accountModel = new base_model_1.BaseModel(account_schema_1.AccountSchema, enums_1.COLLECTION_NAME_ENUM.account);
                        return [4 /*yield*/, accountModel.get(payment.account._id.toString())];
                    case 1:
                        account = _a.sent();
                        entry.origin = this.get_origin(origin, account.type.origin);
                        entry.account = account;
                        entry.currency = account.currency;
                        entry.amount = payment.value;
                        entry.create_date = payment.create_date;
                        entry.create_user = payment.create_user;
                        entry.payment = payment;
                        entry.note = payment.note;
                        entry.setting = payment.setting;
                        if (!(entry.amount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.save(entry)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccountEntryModel.prototype.item_entry = function (item, parent, origin) {
        if (origin === void 0) { origin = true; }
        return __awaiter(this, void 0, void 0, function () {
            var entry, accountModel, proccess, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entry = {}, accountModel = new base_model_1.BaseModel(account_schema_1.AccountSchema, enums_1.COLLECTION_NAME_ENUM.account);
                        if (item.process.length <= 0)
                            return [2 /*return*/];
                        item.process.forEach(function (p) {
                            if (p.document_type == parent.type.document_type) {
                                proccess = p;
                            }
                        });
                        if (!proccess) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, accountModel.get(proccess.account.toString())];
                    case 1:
                        account = _a.sent();
                        entry.origin = this.get_origin(origin, account.type.origin);
                        entry.account = account;
                        entry.currency = account.currency;
                        entry.amount = item.sub_total * utils_1.Utils.convertion(parent.convertion_rate, account.currency);
                        entry.create_date = parent.create_date;
                        entry.create_user = parent.create_user;
                        entry.item = item;
                        entry.note = parent.note;
                        entry.setting = parent.setting;
                        if (!(entry.amount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.save(entry)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccountEntryModel.prototype.tax_entry = function (tax, item_value, parent, origin) {
        if (origin === void 0) { origin = true; }
        return __awaiter(this, void 0, void 0, function () {
            var entry, accountModel, itbis, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entry = {}, accountModel = new base_model_1.BaseModel(account_schema_1.AccountSchema, enums_1.COLLECTION_NAME_ENUM.account), itbis = item_value * (tax.value / 100);
                        return [4 /*yield*/, accountModel.get(tax.account.toString())];
                    case 1:
                        account = _a.sent();
                        entry.origin = this.get_origin(origin, account.type.origin);
                        entry.account = account;
                        entry.currency = account.currency;
                        entry.amount = itbis * (tax.rate || utils_1.Utils.convertion(parent.convertion_rate, account.currency));
                        entry.create_date = parent.create_date;
                        entry.create_user = parent.create_user;
                        entry.tax = tax;
                        entry.note = parent.note;
                        entry.setting = parent.setting;
                        if (!(entry.amount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.save(entry)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, itbis];
                }
            });
        });
    };
    AccountEntryModel.prototype.rate_entry = function (invoice, amount, parent, origin) {
        if (origin === void 0) { origin = true; }
        return __awaiter(this, void 0, void 0, function () {
            var entry, accountModel, settingModel, setting, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entry = {}, accountModel = new base_model_1.BaseModel(account_schema_1.AccountSchema, enums_1.COLLECTION_NAME_ENUM.account), settingModel = new setting_model_1.SettingModel();
                        return [4 /*yield*/, settingModel.get(parent.setting)];
                    case 1:
                        setting = _a.sent();
                        return [4 /*yield*/, accountModel.get(setting.change_account)];
                    case 2:
                        account = _a.sent();
                        if (!account) {
                            console.log("No se ha configurado una cuenta de ganancias o perdidas");
                        }
                        entry.origin = this.get_origin(origin, account.type.origin);
                        entry.account = account;
                        entry.currency = account.currency;
                        entry.amount = amount * utils_1.Utils.convertion(parent.convertion_rate, account.currency);
                        entry.create_date = parent.create_date;
                        entry.create_user = parent.create_user;
                        entry.note = "Ganancia o perdida por cambio";
                        entry.setting = parent.setting;
                        if (!(entry.amount > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.save(entry)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AccountEntryModel;
}(base_model_1.BaseModel));
exports.AccountEntryModel = AccountEntryModel;
//# sourceMappingURL=account.entry.model.js.map