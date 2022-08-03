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
var invoice_schema_1 = require("../../schemas/administration/invoice.schema");
var ncf_schema_1 = require("../../schemas/administration/ncf.schema");
var quotation_schema_1 = require("../../schemas/administration/quotation.schema");
var stock_schema_1 = require("../../schemas/administration/stock.schema");
var acknowledgment_schema_1 = require("../../schemas/administration/acknowledgment.schema");
var package_config_schema_1 = require("../../schemas/configuration/package.config.schema");
var mongoose_1 = require("mongoose");
var base_model_1 = require("../base.model");
var enums_1 = require("../../utils/enums");
var package_model_1 = require("../administration/package.model");
var utils_1 = require("../../utils/utils");
var account_entry_model_1 = require("./account.entry.model");
var stock_model_1 = require("./stock.model");
var InvoiceModel = /** @class */ (function (_super) {
    __extends(InvoiceModel, _super);
    function InvoiceModel() {
        return _super.call(this, invoice_schema_1.InvoiceSchema, 'invoice') || this;
    }
    InvoiceModel.prototype.save = function (invoice) {
        return __awaiter(this, void 0, void 0, function () {
            var session, code, accountEntryModel, stockModel, quotationModel, _a, saved_invoice, i, item, ti, tax, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mongoose_1.startSession()];
                    case 1:
                        session = _b.sent();
                        session.startTransaction();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 19, , 20]);
                        return [4 /*yield*/, utils_1.Utils.generate_code('F', invoice.setting, this)];
                    case 3:
                        code = _b.sent(), accountEntryModel = new account_entry_model_1.AccountEntryModel(), stockModel = new stock_model_1.StockModel(), quotationModel = new base_model_1.BaseModel(quotation_schema_1.QuotationSchema, enums_1.COLLECTION_NAME_ENUM.quotation);
                        invoice.code = code;
                        if (!invoice.ncf_type) return [3 /*break*/, 5];
                        _a = invoice;
                        return [4 /*yield*/, utils_1.Utils.get_next_ncf(invoice.ncf_type, invoice.setting)];
                    case 4:
                        _a.ncf = _b.sent();
                        _b.label = 5;
                    case 5: return [4 /*yield*/, this.package_generation(invoice.items, invoice.setting, invoice.create_user)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, stockModel.out_stock(invoice, 'Consepto de facturación')];
                    case 7:
                        _b.sent();
                        if (!!!invoice.quotation) return [3 /*break*/, 9];
                        return [4 /*yield*/, quotationModel.model.updateOne({ _id: invoice.quotation }, {
                                $set: { status: enums_1.QUOTATION_STATUS_ENUM.invoiced }
                            })];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [4 /*yield*/, _super.prototype.save.call(this, invoice)];
                    case 10:
                        saved_invoice = _b.sent();
                        invoice._id = saved_invoice._id;
                        return [4 /*yield*/, accountEntryModel.invoice_entry(invoice)];
                    case 11:
                        _b.sent();
                        i = 0;
                        _b.label = 12;
                    case 12:
                        if (!(i < invoice.items.length)) return [3 /*break*/, 18];
                        item = invoice.items[i];
                        return [4 /*yield*/, accountEntryModel.item_entry(item, invoice)];
                    case 13:
                        _b.sent();
                        ti = 0;
                        _b.label = 14;
                    case 14:
                        if (!(ti < item.taxes.length)) return [3 /*break*/, 17];
                        tax = item.taxes[ti];
                        return [4 /*yield*/, accountEntryModel.tax_entry(tax, item.sub_total, invoice)];
                    case 15:
                        _b.sent();
                        _b.label = 16;
                    case 16:
                        ti++;
                        return [3 /*break*/, 14];
                    case 17:
                        i++;
                        return [3 /*break*/, 12];
                    case 18:
                        session.commitTransaction();
                        return [2 /*return*/, saved_invoice];
                    case 19:
                        error_1 = _b.sent();
                        session.abortTransaction();
                        console.log(error_1);
                        throw new Error(error_1);
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceModel.prototype.package_generation = function (items, setting, user) {
        return __awaiter(this, void 0, void 0, function () {
            var packageConfigModel, packageModel, i, item, configs, config, pack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        packageConfigModel = new base_model_1.BaseModel(package_config_schema_1.PackageConfigSchema, enums_1.COLLECTION_NAME_ENUM.package_config), packageModel = new package_model_1.PackageModel();
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < items.length)) return [3 /*break*/, 5];
                        item = items[i];
                        return [4 /*yield*/, packageConfigModel.filter({
                                item: new mongoose_1.mongo.ObjectID(item._id)
                            }, {
                                office: 1,
                                item: 1,
                                items: {
                                    quantity: 1,
                                    _id: 1
                                }
                            }, null, 0, 1)];
                    case 2:
                        configs = _a.sent();
                        if (!(configs.length > 0)) return [3 /*break*/, 4];
                        config = configs[0], pack = {};
                        pack.quantity = item.quantity;
                        pack.config = config;
                        pack.date = new Date();
                        pack.status = enums_1.PACKAGE_STATUS_ENUM.created;
                        pack.note = "Facturación";
                        pack.setting = new mongoose_1.mongo.ObjectID(setting.toString());
                        pack.create_date = new Date();
                        pack.create_user = new mongoose_1.mongo.ObjectID(user.toString());
                        return [4 /*yield*/, packageModel.save(pack)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceModel.prototype.update = function (_id, invoice) {
        return __awaiter(this, void 0, void 0, function () {
            var ncfModel, stockModel, ncfs, invoices, stocks, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        if (!(invoice.status == 'Pre-Factura')) return [3 /*break*/, 6];
                        ncfModel = new base_model_1.BaseModel(ncf_schema_1.NcfSchema, 'ncf'), stockModel = new base_model_1.BaseModel(stock_schema_1.StockSchema, 'stock');
                        return [4 /*yield*/, ncfModel.filter({
                                status: 'Activo',
                                type: invoice.ncf_type,
                                $or: [{
                                        'setting._id': invoice.setting._id
                                    },
                                    {
                                        'setting._id': new mongoose_1.mongo.ObjectId(invoice.setting._id)
                                    },
                                    {
                                        setting: { $exists: false }
                                    }],
                                $and: [{
                                        $or: [
                                            { end_date: null },
                                            { end_date: { $exists: false } },
                                            { end_date: { $gte: new Date() } }
                                        ]
                                    }
                                ]
                            }, {}, { sequential: 1 }, 0, 1)];
                    case 1:
                        ncfs = _a.sent();
                        return [4 /*yield*/, this.filter({ "setting._id": invoice.setting._id }, { number: true }, { number: -1 }, 0, 1)];
                    case 2:
                        invoices = _a.sent();
                        invoice.number = invoices.length > 0 ? (invoices[0].number + 1) : 1;
                        if (invoice.ncf_type != '02' && ncfs.length <= 0) {
                            throw new Error("Se agotaron los NCF del tipo " + invoice.ncf_type + ", es necesario agregar una nueva secuencia.");
                        }
                        if (ncfs.length > 0)
                            invoice.ncf = ncfs[0];
                        stocks = invoice.products.map(function (item) {
                            return {
                                item: item,
                                quantity: item.quantity,
                                type: 'out',
                                office: invoice.office,
                                note: 'Consepto de facturación',
                                create_date: invoice.create_date,
                                create_user: invoice.create_user,
                                settings: invoice.setting
                            };
                        });
                        invoice.status = 'Creada';
                        if (!(invoice.acknowledment_ids.length <= 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, stockModel.saveMeny(stocks)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!invoice.ncf) return [3 /*break*/, 6];
                        return [4 /*yield*/, ncfModel.update(invoice.ncf._id, { status: 'Usado' })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [4 /*yield*/, _super.prototype.update.call(this, invoice._id, invoice)];
                    case 7: return [2 /*return*/, _a.sent()];
                    case 8:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throw new Error("Error guardando " + this.document_name);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceModel.prototype.from_acknowledgment = function (ids, user) {
        return __awaiter(this, void 0, void 0, function () {
            var acknowlegmentModel, invoice_1, acknowlegments, invoices, i, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        acknowlegmentModel = new base_model_1.BaseModel(acknowledgment_schema_1.AcknowledgmentSchema, 'acknowledgment'), invoice_1 = {};
                        return [4 /*yield*/, acknowlegmentModel.filter({ _id: { $in: ids } })];
                    case 1:
                        acknowlegments = _a.sent();
                        invoice_1['create_user'] = acknowlegments[0].create_user;
                        invoice_1.setting = user.setting;
                        invoice_1.create_date = new Date();
                        invoice_1.invoice_date = new Date();
                        invoice_1.client = acknowlegments[0].client;
                        invoice_1.products = [];
                        invoice_1.employees = [];
                        invoice_1.note = "Factura de acuse.";
                        invoice_1.office = acknowlegments[0].office;
                        invoice_1.status = 'Pre-Factura';
                        invoice_1.acknowledment_ids = ids;
                        acknowlegments.forEach(function (acknowledgment) {
                            acknowledgment.products.forEach(function (item) {
                                var index = -1;
                                if (invoice_1.products.some(function (p, i) {
                                    index = i;
                                    return p._id == item._id;
                                })) {
                                    invoice_1.products[index].quantity = invoice_1.products[index].quantity.valueOf() + item.quantity.valueOf();
                                }
                                else {
                                    invoice_1.products.push(item);
                                }
                            });
                        });
                        return [4 /*yield*/, this.filter({ "setting._id": invoice_1.setting._id }, { number: true }, { number: -1 }, 0, 1)];
                    case 2:
                        invoices = _a.sent();
                        invoice_1.number = invoices.length > 0 ? (invoices[0].number + 1) : 1;
                        return [4 /*yield*/, _super.prototype.save.call(this, invoice_1)];
                    case 3:
                        i = _a.sent();
                        return [4 /*yield*/, acknowlegmentModel.model.update({ _id: { $in: ids } }, { $set: { status: 'Facturado' } })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, i];
                    case 5:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throw new Error("Error guardando " + this.document_name);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceModel.prototype.pending = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var data_1, invoices, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data_1 = { restant: 0, total: 0, invoices: [] };
                        return [4 /*yield*/, _super.prototype.aggregate.call(this, params, null, null, [{
                                    from: "payments",
                                    localField: "_id",
                                    foreignField: "invoices._id",
                                    as: "payments"
                                }])];
                    case 1:
                        invoices = _a.sent();
                        invoices.forEach(function (invoice) {
                            invoice['restant'] = 0;
                            invoice['restant'] = invoice.total_value;
                            invoice['payments'].forEach(function (payment) {
                                invoice['restant'] -= payment.value.valueOf();
                            });
                            if (invoice['restant'] > 0) {
                                data_1.restant += invoice['restant'];
                                data_1.total += invoice.total_value;
                                data_1.invoices.push({
                                    _id: invoice._id,
                                    restant: invoice['restant'],
                                    total: invoice.total_value,
                                    payment_type: invoice.payment_type,
                                    number: invoice.number,
                                    invoice_date: invoice.invoice_date,
                                    client: {
                                        _id: invoice.client._id,
                                        name: invoice.client.name,
                                        last_name: invoice.client.last_name
                                    }
                                });
                            }
                        });
                        return [2 /*return*/, data_1];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        throw new Error("Error cargando cuentas por cobrar.");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceModel.prototype.change_status = function (_id, invoice) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.update({ _id: _id }, { $set: { status: invoice.status } }, {})];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        throw new Error("Error modificando el estado de " + this.document_name);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return InvoiceModel;
}(base_model_1.BaseModel));
exports.InvoiceModel = InvoiceModel;
//# sourceMappingURL=invoice.model.js.map