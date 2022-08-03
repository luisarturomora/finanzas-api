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
var package_schema_1 = require("../../schemas/administration/package.schema");
var stock_schema_1 = require("../../schemas/administration/stock.schema");
var base_model_1 = require("../base.model");
var mongoose_1 = require("mongoose");
var enums_1 = require("../../utils/enums");
var PackageModel = /** @class */ (function (_super) {
    __extends(PackageModel, _super);
    function PackageModel() {
        return _super.call(this, package_schema_1.PackageSchema, 'package') || this;
    }
    PackageModel.prototype.cancel = function (generation, user) {
        return __awaiter(this, void 0, void 0, function () {
            var stockModel, product_stocks, supply_stocks, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        stockModel = new base_model_1.BaseModel(stock_schema_1.StockSchema, 'stock');
                        product_stocks = generation.config.products.map(function (item) {
                            return {
                                item: item,
                                quantity: item.quantity * generation.quantity.valueOf(),
                                type: 'out',
                                office: generation.config.office,
                                note: generation.note || "Producci\u00F3n " + generation.number + " cancelada.",
                                create_date: new Date(),
                                create_user: user,
                                settings: generation.config.setting
                            };
                        });
                        supply_stocks = generation.config.items.map(function (item) {
                            return {
                                item: item,
                                quantity: item.quantity * generation.quantity.valueOf(),
                                type: 'in',
                                office: generation.config.office,
                                note: generation.note || "Producci\u00F3n " + generation.number + " cancelada.",
                                create_date: new Date(),
                                create_user: user,
                                settings: generation.config.setting
                            };
                        });
                        return [4 /*yield*/, stockModel.saveMeny(product_stocks)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, stockModel.saveMeny(supply_stocks)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, _super.prototype.update.call(this, generation._id, { status: generation.status })];
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
    PackageModel.prototype.save = function (generation) {
        return __awaiter(this, void 0, void 0, function () {
            var stockModel, generations, item_stock, supply_stocks, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        stockModel = new base_model_1.BaseModel(stock_schema_1.StockSchema, 'stock');
                        return [4 /*yield*/, this.filter({ "setting": generation.setting }, { number: true }, { number: -1 }, 1)];
                    case 1:
                        generations = _a.sent();
                        generation.number = generations.length > 0 ? (generations[0].number + 1) : 1;
                        item_stock = {
                            item: generation.config.item,
                            quantity: generation.quantity.valueOf(),
                            type: enums_1.STOCK_TYPE_ENUM.in,
                            office: generation.config.office,
                            note: generation.note || "Producci\u00F3n " + generation.number + " generada.",
                            create_date: new Date(),
                            create_user: generation.create_user,
                            settings: generation.setting
                        };
                        supply_stocks = generation.config.items.map(function (item) {
                            return {
                                item: new mongoose_1.mongo.ObjectId(item._id),
                                quantity: generation.quantity * item.quantity,
                                type: enums_1.STOCK_TYPE_ENUM.out,
                                office: generation.config.office,
                                note: generation.note || "Producci\u00F3n " + generation.number + " generada.",
                                create_date: new Date(),
                                create_user: generation.create_user,
                                settings: generation.setting
                            };
                        });
                        return [4 /*yield*/, stockModel.saveMeny([item_stock])];
                    case 2:
                        _a.sent();
                        if (!(supply_stocks.length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, stockModel.saveMeny(supply_stocks)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, _super.prototype.save.call(this, generation)];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        error_2 = _a.sent();
                        throw new Error(error_2);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return PackageModel;
}(base_model_1.BaseModel));
exports.PackageModel = PackageModel;
//# sourceMappingURL=package.model.js.map