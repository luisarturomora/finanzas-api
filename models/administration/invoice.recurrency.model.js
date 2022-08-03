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
var invoice_recurrency_schema_1 = require("../../schemas/administration/invoice.recurrency.schema");
var setting_schema_1 = require("../../schemas/administration/setting.schema");
var base_model_1 = require("../base.model");
var invoice_model_1 = require("./invoice.model");
var fs_1 = require("fs");
var path_1 = require("path");
var mongoose_1 = require("mongoose");
var payment_schema_1 = require("../../schemas/administration/payment.schema");
var utils_1 = require("../../utils/utils");
var enums_1 = require("../../utils/enums");
var schedule = require('node-schedule');
var InvoiceRecurrencyModel = /** @class */ (function (_super) {
    __extends(InvoiceRecurrencyModel, _super);
    function InvoiceRecurrencyModel() {
        var _this = _super.call(this, invoice_recurrency_schema_1.InvoiceRecurrencySchema, enums_1.COLLECTION_NAME_ENUM.invoice_recurrency) || this;
        _this.generate_invoice();
        return _this;
    }
    InvoiceRecurrencyModel.prototype.save = function (recurrency) {
        return __awaiter(this, void 0, void 0, function () {
            var recurrencies, doc, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.filter({ "setting": recurrency.setting }, { number: true }, { number: -1 }, 1)];
                    case 1:
                        recurrencies = _a.sent();
                        recurrency.number = (recurrencies.length > 0 ? (recurrencies[0].number + 1) : 1);
                        return [4 /*yield*/, _super.prototype.save.call(this, recurrency)];
                    case 2:
                        doc = _a.sent();
                        return [4 /*yield*/, this.generation_process(doc._id.toString())];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, doc];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new Error("Error guardando " + this.document_name);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceRecurrencyModel.prototype.suspend = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.update({ _id: _id }, { $set: { status: enums_1.SERVICE_STATUS_ENUM.finished } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, 'Servicio suspendido correctamente'];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throw new Error("Error suspendiendo " + this.document_name);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceRecurrencyModel.prototype.update = function (_id, service, no_update) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _super.prototype.update.call(this, service._id, service)];
                    case 1:
                        doc = _a.sent();
                        if (!no_update)
                            this.generation_process(service._id.toString());
                        return [2 /*return*/, doc];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throw new Error("Error guardando " + this.document_name);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceRecurrencyModel.prototype.total_product_value = function (items) {
        var total = 0;
        items.forEach(function (item) {
            var itbis = item.item.itbis || 0, product_value = (item.value.valueOf() * item.quantity.valueOf()), product_itbis = product_value * (itbis.valueOf() / 100);
            total += (product_value + product_itbis);
        });
        return total;
    };
    InvoiceRecurrencyModel.prototype.generate_invoice = function () {
        var _this = this;
        var rule = new schedule.RecurrenceRule(), config = utils_1.Config(), hour = config['invoice_generattion_hour'], minute = config['invoice_generattion_minute'];
        rule.minute = minute;
        rule.hour = hour;
        schedule.scheduleJob(rule, function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generation_process()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    InvoiceRecurrencyModel.prototype.payment = function (_id, payment) {
        return __awaiter(this, void 0, void 0, function () {
            var service, invoiceModel, paymentModel, current_date, payment_value, invoice_ids, invoices, last_generation_date, count, invoice, inv, invoice, inv, p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(_id)];
                    case 1:
                        service = _a.sent(), invoiceModel = new invoice_model_1.InvoiceModel(), paymentModel = new base_model_1.BaseModel(payment_schema_1.PaymentSchema, 'payment'), current_date = new Date(), payment_value = payment.value.valueOf(), invoice_ids = service.invoices.map(function (i) { return i._id.toString(); });
                        return [4 /*yield*/, invoiceModel.filter({
                                _id: { $in: invoice_ids },
                                status: { $in: [enums_1.INVOICE_STATUS_ENUM.Created, enums_1.INVOICE_STATUS_ENUM.Payed] }
                            })];
                    case 2:
                        invoices = _a.sent(), last_generation_date = new Date(service.start_date);
                        count = 0;
                        _a.label = 3;
                    case 3:
                        if (!(count < invoices.length)) return [3 /*break*/, 7];
                        invoice = invoices[count];
                        if (!(invoice.status == enums_1.INVOICE_STATUS_ENUM.Created && payment_value > 0)) return [3 /*break*/, 5];
                        inv = {};
                        inv._id = invoice._id;
                        inv.code = invoice.code;
                        inv.date = invoice.date;
                        return [4 /*yield*/, invoiceModel.model.update({ _id: invoice._id }, { $set: { status: enums_1.INVOICE_STATUS_ENUM.Payed } })];
                    case 4:
                        _a.sent();
                        payment.invoices.push(inv);
                        payment_value -= invoice['total_value'];
                        _a.label = 5;
                    case 5:
                        last_generation_date = new Date(invoice.date);
                        _a.label = 6;
                    case 6:
                        count++;
                        return [3 /*break*/, 3];
                    case 7:
                        if (invoices.length > 0)
                            last_generation_date = utils_1.Utils.get_next_date(service.frequency_type.toString(), new Date(last_generation_date), service.frequency_value.valueOf());
                        _a.label = 8;
                    case 8:
                        if (!(current_date >= last_generation_date || payment_value > 0)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.create_invoice(service, last_generation_date, enums_1.INVOICE_STATUS_ENUM.Payed)];
                    case 9:
                        invoice = _a.sent();
                        invoice = invoice;
                        inv = {};
                        inv._id = invoice._id;
                        inv.number = invoice.number;
                        inv.invoice_date = invoice.date;
                        return [4 /*yield*/, invoiceModel.model.update({ _id: invoice._id }, { $set: { status: enums_1.INVOICE_STATUS_ENUM.Payed } })];
                    case 10:
                        _a.sent();
                        payment.invoices.push(inv);
                        payment_value -= invoice['total_value'];
                        service.invoices.push(invoice._id);
                        last_generation_date = utils_1.Utils.get_next_date(service.frequency_type.toString(), new Date(last_generation_date), service.frequency_value.valueOf());
                        return [3 /*break*/, 8];
                    case 11: return [4 /*yield*/, _super.prototype.update.call(this, service._id, { $set: { invoices: service.invoices } })];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, paymentModel.save(payment)];
                    case 13:
                        p = _a.sent();
                        return [2 /*return*/, p];
                }
            });
        });
    };
    InvoiceRecurrencyModel.prototype.contractPrint = function (sv) {
        return __awaiter(this, void 0, void 0, function () {
            var path, service, templateData, settingModel, template_1, number, _a, fields, production_value, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        path = process.cwd();
                        return [4 /*yield*/, this.get(sv._id)];
                    case 1:
                        service = _b.sent(), templateData = fs_1.readFileSync(path_1.join(path, "/public/files/" + service.setting._id + "/templates/service_contract.html")), settingModel = new base_model_1.BaseModel(setting_schema_1.SettingSchema, 'setting'), template_1 = templateData.toString();
                        number = service.number.toString();
                        _a = service;
                        return [4 /*yield*/, settingModel.get(service.setting._id)];
                    case 2:
                        _a.setting = _b.sent();
                        while (number.length <= 5) {
                            number = '0' + number;
                        }
                        template_1 = template_1.replace('{{service_number}}', number);
                        template_1 = template_1.replace('{{company_name}}', service.setting.name);
                        /*if (!service.setting.rnc)
                            template = template.replace('{{hidde_rnc}}', 'hidden')
                        else {
                            template = template.replace('{{hidde_rnc}}', '')
                            template = template.replace('{{company_rnc}}', service.setting.rnc)
                        }*/
                        /*template = template.replace(/{{company_address}}/g, service.setting.address.valueOf())
                         template = template.replace(/{{representant_name}}/g, service.setting.representant_name.valueOf())*/
                        template_1 = template_1.replace(/{{client_name}}/g, service.client.name.toString());
                        template_1 = template_1.replace(/{{client_last_name}}/g, service.client.last_name.toString());
                        template_1 = template_1.replace(/{{date_day}}/g, new Date(service.create_date).getDate().toString());
                        template_1 = template_1.replace(/{{date_year}}/g, new Date(service.create_date).getFullYear().toString());
                        template_1 = template_1.replace(/{{date_month_string}}/g, new Date(service.create_date).getMonth().toString());
                        fields = service.client.type.fields;
                        fields = fields.concat(service.fields);
                        fields.filter(function (f) {
                            return f.show_on_invoice;
                        }).sort(function (f, e) {
                            return (f.order < e.order) ? -1 : 1;
                        }).forEach(function (field) {
                            if (field.type != 'group') {
                                var regexp = new RegExp(field._id.toString(), 'g');
                                template_1 = template_1.replace(regexp, field.value || '');
                            }
                            else {
                                if (field.multiple_instance) {
                                    var table_string_1 = '<table><thead><tr>', child_fields_1 = field.fields.filter(function (f) {
                                        return f.show_on_invoice;
                                    }).sort(function (f, e) {
                                        return (f.order < e.order) ? -1 : 1;
                                    });
                                    child_fields_1.forEach(function (f) {
                                        table_string_1 += "<th>" + f.text + "</th>";
                                    });
                                    table_string_1 += "</th></tr></thead><tbody>";
                                    (field.value || []).forEach(function (value) {
                                        table_string_1 += "<tr>";
                                        child_fields_1.forEach(function (f) {
                                            var regexp = new RegExp(f._id, 'g');
                                            table_string_1 += "<td>" + value[f._id] + "</td>";
                                            template_1 = template_1.replace(regexp, value[f._id] || '');
                                        });
                                        table_string_1 += "</tr>";
                                    });
                                    table_string_1 += "</tbody></table>";
                                    var regexp = new RegExp(field._id.toString(), 'g');
                                    template_1 = template_1.replace(regexp, table_string_1);
                                }
                                else {
                                    var child_fields = field.fields.filter(function (f) {
                                        return f.show_on_invoice;
                                    }).sort(function (f, e) {
                                        return (f.order < e.order) ? -1 : 1;
                                    });
                                    child_fields.forEach(function (f) {
                                        var regexp = new RegExp(f._id.toString(), 'g');
                                        template_1 = template_1.replace(regexp, f.value || '');
                                    });
                                }
                            }
                        });
                        production_value = this.total_product_value(service.items);
                        template_1 = template_1.replace(/{{production_value}}/g, production_value.toString());
                        //template = template.replace(/{{payment_day_string}}/g, writtenNumber( new Date(loan.start_date).getDate(), { lang: 'es' }))
                        return [2 /*return*/, template_1];
                    case 3:
                        error_4 = _b.sent();
                        console.log(error_4);
                        return [2 /*return*/, 'Error imprimiendo el contrato'];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceRecurrencyModel.prototype.create_invoice = function (service, last_payment, status) {
        return __awaiter(this, void 0, void 0, function () {
            var invoice, invoiceModel, invoices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invoice = {}, invoiceModel = new invoice_model_1.InvoiceModel();
                        return [4 /*yield*/, this.filter({ "setting._id": service.setting._id }, { number: true }, { number: -1 }, 1)];
                    case 1:
                        invoices = _a.sent();
                        invoice.number = invoices.length > 0 ? (invoices[0].number + 1) : 1;
                        invoice.status = status;
                        //invoice.print_sale_point = service.setting.print_sale_point;
                        invoice.payments = [];
                        invoice.client = service.client;
                        invoice.invoice_date = new Date(last_payment);
                        invoice.create_date = new Date();
                        invoice.create_user = service.create_user;
                        invoice.ncf_type = '02';
                        invoice.note = service.note;
                        invoice.office = service.office;
                        invoice.payment_type = "Credito";
                        invoice.items = service.items;
                        invoice.setting = service.setting;
                        return [4 /*yield*/, invoiceModel.save(invoice)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InvoiceRecurrencyModel.prototype.generation_process = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var params, services, invoiceModel, count, service, _ids, invoices, current_date, last_generation_date, invoice, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        params = {
                            status: enums_1.SERVICE_STATUS_ENUM.active
                        };
                        if (_id)
                            params._id = new mongoose_1.mongo.ObjectId(_id);
                        return [4 /*yield*/, this.filter(params)];
                    case 1:
                        services = _a.sent(), invoiceModel = new invoice_model_1.InvoiceModel();
                        count = 0;
                        _a.label = 2;
                    case 2:
                        if (!(count < services.length)) return [3 /*break*/, 9];
                        service = services[count], _ids = service.invoices.map(function (i) { return i._id; });
                        return [4 /*yield*/, invoiceModel.filter({
                                _id: { $in: _ids },
                                status: { $ne: 'Cancelada' }
                            }, { "date": true })];
                    case 3:
                        invoices = _a.sent(), current_date = new Date(), last_generation_date = new Date(service.start_date);
                        if (invoices.length > 0)
                            last_generation_date = invoices[invoices.length - 1]['date'];
                        last_generation_date = utils_1.Utils.get_next_date(service.frequency.toString(), last_generation_date, service.frequency.valueOf());
                        _a.label = 4;
                    case 4:
                        if (!(current_date >= last_generation_date)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.create_invoice(service, last_generation_date, enums_1.INVOICE_STATUS_ENUM.Created)];
                    case 5:
                        invoice = _a.sent();
                        service.invoices.push(invoice);
                        last_generation_date = utils_1.Utils.get_next_date(service.frequency.toString(), last_generation_date, service.frequency.valueOf());
                        return [3 /*break*/, 4];
                    case 6:
                        if (service.end_date && service.end_date < current_date)
                            service.status = "Finalizado";
                        return [4 /*yield*/, this.update(service._id, service, true)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        count++;
                        return [3 /*break*/, 2];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return InvoiceRecurrencyModel;
}(base_model_1.BaseModel));
exports.InvoiceRecurrencyModel = InvoiceRecurrencyModel;
//# sourceMappingURL=invoice.recurrency.model.js.map