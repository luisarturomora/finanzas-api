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
var utils_1 = require("../../utils/utils");
var payment_schema_1 = require("../../schemas/administration/payment.schema");
var mongoose_1 = require("mongoose");
var invoice_model_1 = require("./invoice.model");
var account_entry_model_1 = require("./account.entry.model");
var purchase_model_1 = require("./purchase.model");
var PaymentModel = /** @class */ (function (_super) {
    __extends(PaymentModel, _super);
    function PaymentModel() {
        return _super.call(this, payment_schema_1.PaymentSchema, enums_1.COLLECTION_NAME_ENUM.payment) || this;
    }
    PaymentModel.prototype.save = function (payment) {
        return __awaiter(this, void 0, void 0, function () {
            var session, code_prefix, code, accountEntryModel, _payment, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.startSession()];
                    case 1:
                        session = _a.sent();
                        return [4 /*yield*/, session.startTransaction()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 9, , 10]);
                        code_prefix = payment.client ? 'PC' : 'PP';
                        return [4 /*yield*/, utils_1.Utils.generate_code(code_prefix, payment.setting, this)];
                    case 4:
                        code = _a.sent(), accountEntryModel = new account_entry_model_1.AccountEntryModel();
                        payment.code = code;
                        payment.status = enums_1.PAYMENT_STATUS_ENUN.created;
                        return [4 /*yield*/, _super.prototype.save.call(this, payment)];
                    case 5:
                        _payment = _a.sent();
                        payment._id = _payment._id;
                        return [4 /*yield*/, accountEntryModel.payment_entry(payment)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.invoice_entity(payment)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.purchase_entity(payment)];
                    case 8:
                        _a.sent();
                        session.commitTransaction();
                        return [2 /*return*/, _payment];
                    case 9:
                        error_1 = _a.sent();
                        session.abortTransaction();
                        console.log(error_1);
                        throw new Error(error_1);
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    PaymentModel.prototype.invoice_entity = function (payment) {
        return __awaiter(this, void 0, void 0, function () {
            var invoiceModel, accountEntryModel, i, invoice, ti, tax, current_value, invoice_value, restant, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (payment.invoices.length <= 0)
                            return [2 /*return*/];
                        invoiceModel = new invoice_model_1.InvoiceModel(), accountEntryModel = new account_entry_model_1.AccountEntryModel();
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < payment.invoices.length)) return [3 /*break*/, 12];
                        invoice = payment.invoices[i];
                        if (invoice.payment_restant <= 0) {
                            invoice.status = enums_1.INVOICE_STATUS_ENUM.Payed;
                        }
                        else {
                            invoice.status = enums_1.INVOICE_STATUS_ENUM.PartialPayment;
                        }
                        return [4 /*yield*/, invoiceModel.model.update({
                                _id: invoice._id
                            }, {
                                $set: {
                                    status: invoice.status
                                }
                            })];
                    case 2:
                        _a.sent();
                        invoice.create_user = payment.create_user;
                        invoice.note = payment.note;
                        invoice.setting = payment.setting;
                        invoice.create_date = payment.create_date;
                        return [4 /*yield*/, accountEntryModel.invoice_entry(invoice, false)];
                    case 3:
                        _a.sent();
                        ti = 0;
                        _a.label = 4;
                    case 4:
                        if (!(ti < payment.taxes.length)) return [3 /*break*/, 9];
                        tax = payment.taxes[ti];
                        tax.rate = invoice.rate;
                        if (!tax.apply_value) return [3 /*break*/, 6];
                        return [4 /*yield*/, accountEntryModel.tax_entry(tax, invoice.sub_total_value, invoice, true)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, accountEntryModel.tax_entry(tax, invoice.total_itbis, invoice, true)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        ti++;
                        return [3 /*break*/, 4];
                    case 9:
                        current_value = (invoice.sub_total_value + invoice.total_itbis) * invoice.rate, invoice_value = invoice.total_value * utils_1.Utils.convertion(invoice.convertion_rate, invoice.account.currency), restant = current_value - invoice_value;
                        if (!(restant != 0)) return [3 /*break*/, 11];
                        value = restant < 0 ? (restant * -1) : restant;
                        return [4 /*yield*/, accountEntryModel.rate_entry(invoice, value, payment, restant > 0)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 1];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    PaymentModel.prototype.purchase_entity = function (payment) {
        return __awaiter(this, void 0, void 0, function () {
            var purchaseModel, accountEntryModel, i, purchase, current_value, purchase_value, restant, value, ti, tax;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (payment.purchases.length <= 0)
                            return [2 /*return*/];
                        purchaseModel = new purchase_model_1.PurchaseModel(), accountEntryModel = new account_entry_model_1.AccountEntryModel();
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < payment.purchases.length)) return [3 /*break*/, 12];
                        purchase = payment.purchases[i];
                        if (purchase.payment_restant <= 0) {
                            purchase.status = enums_1.PURCHASE_STATUS_ENUM.Payed;
                        }
                        else {
                            purchase.status = enums_1.PURCHASE_STATUS_ENUM.PartialPayment;
                        }
                        return [4 /*yield*/, purchaseModel.model.update({
                                _id: purchase._id
                            }, {
                                $set: {
                                    status: purchase.status
                                }
                            })];
                    case 2:
                        _a.sent();
                        purchase.create_user = payment.create_user;
                        purchase.note = payment.note;
                        purchase.setting = payment.setting;
                        purchase.create_date = payment.create_date;
                        return [4 /*yield*/, accountEntryModel.purchase_entry(purchase, false)];
                    case 3:
                        _a.sent();
                        current_value = purchase.total_value * purchase.rate, purchase_value = purchase.total_value * utils_1.Utils.convertion(purchase.convertion_rate, purchase.account.currency), restant = current_value - purchase_value;
                        if (!(restant != 0)) return [3 /*break*/, 5];
                        value = restant < 0 ? (restant * -1) : restant;
                        return [4 /*yield*/, accountEntryModel.rate_entry(purchase, value, payment, restant < 0)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        ti = 0;
                        _a.label = 6;
                    case 6:
                        if (!(ti < payment.taxes.length)) return [3 /*break*/, 11];
                        tax = payment.taxes[ti];
                        tax.rate = purchase.rate;
                        if (!tax.apply_value) return [3 /*break*/, 8];
                        return [4 /*yield*/, accountEntryModel.tax_entry(tax, purchase.sub_total_value, purchase, false)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, accountEntryModel.tax_entry(tax, purchase.total_itbis, purchase, false)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        ti++;
                        return [3 /*break*/, 6];
                    case 11:
                        i++;
                        return [3 /*break*/, 1];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    return PaymentModel;
}(base_model_1.BaseModel));
exports.PaymentModel = PaymentModel;
//# sourceMappingURL=payment.model.js.map