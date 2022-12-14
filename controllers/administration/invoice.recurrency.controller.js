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
var invoice_recurrency_model_1 = require("../../models/administration/invoice.recurrency.model");
var base_controller_1 = require("../base.controller");
var enums_1 = require("../../utils/enums");
var InvoiceRecurrencyController = /** @class */ (function (_super) {
    __extends(InvoiceRecurrencyController, _super);
    function InvoiceRecurrencyController() {
        var _this = this;
        var model = new invoice_recurrency_model_1.InvoiceRecurrencyModel();
        _this = _super.call(this, model) || this;
        _this.model = model;
        _this.document_name = enums_1.COLLECTION_NAME_ENUM.invoice_recurrency;
        return _this;
    }
    InvoiceRecurrencyController.prototype.contractPrint = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var loan, template, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        loan = req.body;
                        return [4 /*yield*/, this.model.contractPrint(loan)];
                    case 1:
                        template = _a.sent();
                        res.json({
                            result: true,
                            template: template
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        res.json({
                            result: false,
                            message: error_1
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceRecurrencyController.prototype.payment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var payment, _id, p, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payment = req.body || {}, _id = req.params._id;
                        payment.create_user = {
                            user_name: req['user'].name,
                            account: req['user'].account,
                        };
                        payment.setting = req['user'].setting;
                        payment.create_date = new Date();
                        payment.update_date = new Date();
                        return [4 /*yield*/, this.model.payment(_id, payment)];
                    case 1:
                        p = _a.sent();
                        res.json({
                            result: true,
                            payment: p,
                            message: 'Pago agregado correctamete.'
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.json({
                            result: false,
                            message: 'Error agregando pago.'
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InvoiceRecurrencyController.prototype.suspend = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, message, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = req.params._id;
                        return [4 /*yield*/, this.model.suspend(_id)];
                    case 1:
                        message = _a.sent();
                        res.json({
                            result: true,
                            message: message
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.json({
                            result: false,
                            message: 'Error suspendiendo pago.'
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return InvoiceRecurrencyController;
}(base_controller_1.BaseController));
exports.InvoiceRecurrencyController = InvoiceRecurrencyController;
//# sourceMappingURL=invoice.recurrency.controller.js.map