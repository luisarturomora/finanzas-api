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
var credit_note_schema_1 = require("../../schemas/configuration/credit.note.schema");
var mongoose_1 = require("mongoose");
var base_model_1 = require("../base.model");
var utils_1 = require("../../utils/utils");
var enums_1 = require("../../utils/enums");
var account_entry_model_1 = require("./account.entry.model");
var invoice_model_1 = require("./invoice.model");
var purchase_model_1 = require("./purchase.model");
var CreditNoteModel = /** @class */ (function (_super) {
    __extends(CreditNoteModel, _super);
    function CreditNoteModel() {
        return _super.call(this, credit_note_schema_1.CreditNoteSchema, enums_1.COLLECTION_NAME_ENUM.credit_note) || this;
    }
    CreditNoteModel.prototype.save = function (credit_note) {
        return __awaiter(this, void 0, void 0, function () {
            var session, ts, code, _a, saved_credit_note, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mongoose_1.startSession()];
                    case 1:
                        session = _b.sent();
                        return [4 /*yield*/, session.startTransaction()];
                    case 2:
                        ts = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 7, , 8]);
                        return [4 /*yield*/, utils_1.Utils.generate_code('CN', credit_note.setting, this)];
                    case 4:
                        code = _b.sent();
                        credit_note.code = code;
                        _a = credit_note;
                        return [4 /*yield*/, utils_1.Utils.get_next_ncf(credit_note.ncf_type, credit_note.setting)];
                    case 5:
                        _a.ncf = (_b.sent());
                        return [4 /*yield*/, _super.prototype.save.call(this, credit_note)];
                    case 6:
                        saved_credit_note = _b.sent();
                        credit_note._id = saved_credit_note._id;
                        if (credit_note.client) {
                            this.invoice_entity(credit_note);
                        }
                        else {
                            this.purchase_entity(credit_note);
                        }
                        session.commitTransaction();
                        return [2 /*return*/, saved_credit_note];
                    case 7:
                        error_1 = _b.sent();
                        session.abortTransaction();
                        console.log(error_1);
                        throw new Error(error_1);
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    CreditNoteModel.prototype.invoice_entity = function (credit_note) {
        return __awaiter(this, void 0, void 0, function () {
            var accountEntryModel, invoice, invoiceModel, i, item, ti, tax;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accountEntryModel = new account_entry_model_1.AccountEntryModel(), invoice = credit_note.invoice, invoiceModel = new invoice_model_1.InvoiceModel();
                        if (invoice.total_value <= credit_note.value) {
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
                    case 1:
                        _a.sent();
                        invoice.note = (credit_note.note || '').toString();
                        invoice.create_date = credit_note.create_date;
                        invoice.create_user = credit_note.create_user;
                        invoice.setting = credit_note.setting;
                        invoice.items = credit_note.items;
                        return [4 /*yield*/, accountEntryModel.invoice_entry(invoice, false)];
                    case 2:
                        _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < invoice.items.length)) return [3 /*break*/, 9];
                        item = invoice.items[i];
                        return [4 /*yield*/, accountEntryModel.item_entry(item, invoice, false)];
                    case 4:
                        _a.sent();
                        ti = 0;
                        _a.label = 5;
                    case 5:
                        if (!(ti < item.taxes.length)) return [3 /*break*/, 8];
                        tax = item.taxes[ti];
                        return [4 /*yield*/, accountEntryModel.tax_entry(tax, item.sub_total, invoice, false)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        ti++;
                        return [3 /*break*/, 5];
                    case 8:
                        i++;
                        return [3 /*break*/, 3];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    CreditNoteModel.prototype.purchase_entity = function (credit_note) {
        return __awaiter(this, void 0, void 0, function () {
            var accountEntryModel, purchase, purchaseModel, i, item, it, tax;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accountEntryModel = new account_entry_model_1.AccountEntryModel(), purchase = credit_note.purchase, purchaseModel = new purchase_model_1.PurchaseModel();
                        if (purchase.total_value <= credit_note.value) {
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
                    case 1:
                        _a.sent();
                        purchase.note = credit_note.note.toString();
                        purchase.create_date = credit_note.create_date;
                        purchase.create_user = credit_note.create_user;
                        purchase.setting = credit_note.setting;
                        purchase.items = credit_note.items;
                        return [4 /*yield*/, accountEntryModel.purchase_entry(purchase, false)];
                    case 2:
                        _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < purchase.items.length)) return [3 /*break*/, 9];
                        item = purchase.items[i];
                        return [4 /*yield*/, accountEntryModel.item_entry(item, purchase, false)];
                    case 4:
                        _a.sent();
                        it = 0;
                        _a.label = 5;
                    case 5:
                        if (!(it < item.taxes.length)) return [3 /*break*/, 8];
                        tax = item.taxes[it];
                        return [4 /*yield*/, accountEntryModel.tax_entry(tax, item.sub_total, purchase, false)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        it++;
                        return [3 /*break*/, 5];
                    case 8:
                        i++;
                        return [3 /*break*/, 3];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return CreditNoteModel;
}(base_model_1.BaseModel));
exports.CreditNoteModel = CreditNoteModel;
//# sourceMappingURL=credit.note.model.js.map