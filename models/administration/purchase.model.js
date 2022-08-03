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
var purchase_schema_1 = require("../../schemas/administration/purchase.schema");
var item_schema_1 = require("../../schemas/administration/item.schema");
var stock_schema_1 = require("../../schemas/administration/stock.schema");
var base_model_1 = require("../base.model");
var payment_schema_1 = require("../../schemas/administration/payment.schema");
var enums_1 = require("../../utils/enums");
var utils_1 = require("../../utils/utils");
var stock_model_1 = require("./stock.model");
var account_entry_model_1 = require("./account.entry.model");
var purchase_order_schema_1 = require("../../schemas/administration/purchase.order.schema");
var PurchaseModel = /** @class */ (function (_super) {
    __extends(PurchaseModel, _super);
    function PurchaseModel() {
        return _super.call(this, purchase_schema_1.PurchaseSchema, enums_1.COLLECTION_NAME_ENUM.purchase) || this;
    }
    PurchaseModel.prototype.save = function (purchase) {
        return __awaiter(this, void 0, void 0, function () {
            var stockModel, accountEntryModel, purchaseOrderModel, _a, _b, _purchase, i, item, it, tax, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 15, , 16]);
                        stockModel = new stock_model_1.StockModel(), accountEntryModel = new account_entry_model_1.AccountEntryModel(), purchaseOrderModel = new base_model_1.BaseModel(purchase_order_schema_1.PurchaseOrderSchema, enums_1.COLLECTION_NAME_ENUM.quotation);
                        _a = purchase;
                        return [4 /*yield*/, utils_1.Utils.generate_code('CP', purchase.setting, this)];
                    case 1:
                        _a.code = _c.sent();
                        _b = purchase;
                        return [4 /*yield*/, utils_1.Utils.get_next_ncf(purchase.ncf_type, purchase.setting)];
                    case 2:
                        _b.ncf = _c.sent();
                        return [4 /*yield*/, _super.prototype.save.call(this, purchase)];
                    case 3:
                        _purchase = _c.sent();
                        purchase._id = _purchase._id;
                        return [4 /*yield*/, stockModel.in_stock(purchase, 'Compra de productos o servicios')];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, accountEntryModel.purchase_entry(purchase)];
                    case 5:
                        _c.sent();
                        if (!!!purchase.purchase_order) return [3 /*break*/, 7];
                        return [4 /*yield*/, purchaseOrderModel.model.updateOne({ _id: purchase.purchase_order }, {
                                $set: { status: enums_1.PURCHASE_ORDER_STATUS_ENUM.invoiced }
                            })];
                    case 6:
                        _c.sent();
                        _c.label = 7;
                    case 7:
                        i = 0;
                        _c.label = 8;
                    case 8:
                        if (!(i < purchase.items.length)) return [3 /*break*/, 14];
                        item = purchase.items[i];
                        return [4 /*yield*/, accountEntryModel.item_entry(item, purchase)];
                    case 9:
                        _c.sent();
                        it = 0;
                        _c.label = 10;
                    case 10:
                        if (!(it < item.taxes.length)) return [3 /*break*/, 13];
                        tax = item.taxes[it];
                        return [4 /*yield*/, accountEntryModel.tax_entry(tax, item.sub_total, purchase)];
                    case 11:
                        _c.sent();
                        _c.label = 12;
                    case 12:
                        it++;
                        return [3 /*break*/, 10];
                    case 13:
                        i++;
                        return [3 /*break*/, 8];
                    case 14: return [2 /*return*/, _purchase];
                    case 15:
                        error_1 = _c.sent();
                        console.log(error_1);
                        throw new Error("Error guardando " + this.document_name);
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    PurchaseModel.prototype.return_purchase = function (purchase, user) {
        return __awaiter(this, void 0, void 0, function () {
            var productModel_1, stockModel, paymentModel, stocks, payments, payment_ids, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        productModel_1 = new base_model_1.BaseModel(item_schema_1.ItemSchema, enums_1.COLLECTION_NAME_ENUM.item), stockModel = new base_model_1.BaseModel(stock_schema_1.StockSchema, enums_1.COLLECTION_NAME_ENUM.stock), paymentModel = new base_model_1.BaseModel(payment_schema_1.PaymentSchema, 'payment');
                        stocks = purchase.items.map(function (item) {
                            return {
                                item: item,
                                quantity: item.quantity,
                                type: 'out',
                                office: purchase.office,
                                note: 'Consepto devolucion de compra.',
                                create_date: new Date(),
                                create_user: user,
                                settings: purchase.setting
                            };
                        });
                        return [4 /*yield*/, purchase.items.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var p;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, productModel_1.get(item._id)];
                                        case 1:
                                            p = _a.sent();
                                            return [4 /*yield*/, productModel_1.update(item._id, { stock: (p.stock + item.quantity) })];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, paymentModel.filter({
                                'purchases._id': purchase._id
                            }, {
                                _id: true
                            })];
                    case 2:
                        payments = _a.sent(), payment_ids = payments.map(function (payment) {
                            return payment._id;
                        });
                        return [4 /*yield*/, paymentModel.model.update({ _id: { $in: payment_ids } }, { $set: { status: 'Canceled' } }, { multi: true })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, stockModel.saveMeny(stocks)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, _super.prototype.update.call(this, purchase._id, { status: purchase.status })];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throw new Error("Error guardando " + this.document_name);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PurchaseModel.prototype.pending = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var data_1, purchases, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data_1 = { restant: 0, total: 0, purchases: [] };
                        return [4 /*yield*/, _super.prototype.aggregate.call(this, params, null, null, [{
                                    from: "payments",
                                    localField: "_id",
                                    foreignField: "purchases._id",
                                    as: "payments"
                                }])];
                    case 1:
                        purchases = _a.sent();
                        purchases.forEach(function (purchase) {
                            purchase['restant'] = 0;
                            purchase = purchase; //PurchaseService.get_total(purchase);
                            purchase['restant'] = purchase['total_value'];
                            purchase['payments'].forEach(function (payment) {
                                purchase['restant'] -= payment.value.valueOf();
                            });
                            if (purchase['restant'] > 0) {
                                data_1.restant += purchase['restant'];
                                data_1.total += purchase['total_value'];
                                data_1.purchases.push({
                                    _id: purchase._id,
                                    restant: purchase['restant'],
                                    total: purchase['total_value'],
                                    payment_type: purchase.payment_type,
                                    code: purchase.code,
                                    date: purchase.date,
                                    provider: {
                                        _id: purchase.provider._id,
                                        name: purchase.provider.name,
                                        last_name: purchase.provider.last_name
                                    }
                                });
                            }
                        });
                        return [2 /*return*/, data_1];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throw new Error("Error cargando cuentas por pagar.");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PurchaseModel.prototype.change_status = function (_id, puchase) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.update({ _id: _id }, { $set: { status: puchase.status } }, {})];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        throw new Error("Error modificando el estado de " + this.document_name);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PurchaseModel;
}(base_model_1.BaseModel));
exports.PurchaseModel = PurchaseModel;
//# sourceMappingURL=purchase.model.js.map