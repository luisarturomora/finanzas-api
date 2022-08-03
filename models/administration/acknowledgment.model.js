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
var acknowledgment_schema_1 = require("../../schemas/administration/acknowledgment.schema");
var item_schema_1 = require("../../schemas/administration/item.schema");
var stock_schema_1 = require("../../schemas/administration/stock.schema");
var base_model_1 = require("../base.model");
var enums_1 = require("../../utils/enums");
var mongoose_1 = require("mongoose");
var AcknowledgmentModel = /** @class */ (function (_super) {
    __extends(AcknowledgmentModel, _super);
    function AcknowledgmentModel() {
        return _super.call(this, acknowledgment_schema_1.AcknowledgmentSchema, 'acknowledgment') || this;
    }
    AcknowledgmentModel.prototype.cancel = function (acknowledgment, user) {
        return __awaiter(this, void 0, void 0, function () {
            var productModel_1, stockModel, stocks, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        productModel_1 = new base_model_1.BaseModel(item_schema_1.ItemSchema, enums_1.COLLECTION_NAME_ENUM.item), stockModel = new base_model_1.BaseModel(stock_schema_1.StockSchema, enums_1.COLLECTION_NAME_ENUM.stock);
                        stocks = acknowledgment.items.map(function (item) {
                            var stock = {};
                            stock.item = new mongoose_1.mongo.ObjectId(item._id);
                            stock.quantity = item['quantity'];
                            stock.type = enums_1.STOCK_TYPE_ENUM.in;
                            stock.office = acknowledgment.office;
                            stock.note = 'Consepto acuse cancelado.';
                            stock.create_date = new Date();
                            stock.create_user = new mongoose_1.mongo.ObjectId(user._id);
                            stock.settings = new mongoose_1.mongo.ObjectId(acknowledgment.setting._id);
                            return stock;
                        });
                        return [4 /*yield*/, acknowledgment.items.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var p;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, productModel_1.get(item._id)];
                                        case 1:
                                            p = _a.sent();
                                            return [4 /*yield*/, productModel_1.update(item._id, { stock: (p.stock + item['quantity']) })];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, stockModel.saveMeny(stocks)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, _super.prototype.update.call(this, acknowledgment._id, { status: acknowledgment.status })];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new Error("Error guardando " + this.document_name);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AcknowledgmentModel.prototype.save = function (acknowledgment) {
        return __awaiter(this, void 0, void 0, function () {
            var stockModel, acknowledgments, stocks, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        stockModel = new base_model_1.BaseModel(stock_schema_1.StockSchema, enums_1.COLLECTION_NAME_ENUM.stock);
                        return [4 /*yield*/, this.filter({
                                "setting._id": acknowledgment.setting._id
                            }, {
                                number: true
                            }, {
                                number: -1
                            }, 0, 1)];
                    case 1:
                        acknowledgments = _a.sent();
                        acknowledgment.number = acknowledgments.length > 0 ? (acknowledgments[0].number + 1) : 1;
                        stocks = acknowledgment.items.map(function (item) {
                            var stock = {};
                            stock.item = new mongoose_1.mongo.ObjectId(item._id);
                            stock.quantity = item['quantity'];
                            stock.type = enums_1.STOCK_TYPE_ENUM.out;
                            stock.office = new mongoose_1.mongo.ObjectId(acknowledgment.office._id);
                            stock.note = 'Consepto de acuse.';
                            stock.create_date = new Date();
                            stock.create_user = new mongoose_1.mongo.ObjectId(acknowledgment.create_user._id);
                            stock.settings = new mongoose_1.mongo.ObjectId(acknowledgment.setting._id);
                            return stock;
                        });
                        return [4 /*yield*/, stockModel.saveMeny(stocks)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, _super.prototype.save.call(this, acknowledgment)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throw error_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AcknowledgmentModel;
}(base_model_1.BaseModel));
exports.AcknowledgmentModel = AcknowledgmentModel;
//# sourceMappingURL=acknowledgment.model.js.map