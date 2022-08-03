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
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var enums_1 = require("./enums");
var path_1 = require("path");
var fs_1 = require("fs");
var base_model_1 = require("../models/base.model");
var ncf_schema_1 = require("../schemas/administration/ncf.schema");
var mongoose_1 = require("mongoose");
exports.Config = function () {
    var env = process.env.NODE_ENV || 'default', config_path = path_1.join(process.cwd(), 'config', env + ".json");
    if (fs_1.existsSync(config_path)) {
        var config = fs_1.readFileSync(config_path, { encoding: 'utf8' });
        return JSON.parse(config);
    }
    else {
        throw new Error("No se encontro la configuraci\u00F3n " + env);
        process.exit(0);
        return;
    }
};
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.encrypt = function (text) {
        var cipher = crypto.createCipher(Utils.algorithm, Utils.password), crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    };
    Utils.decrypt = function (text) {
        var decipher = crypto.createDecipher(Utils.algorithm, Utils.password), dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    };
    Utils.get_next_date = function (frequency_type, date, frequency) {
        if (frequency_type != enums_1.FREQUENCY_TYPE_ENUM.hour) {
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
        }
        switch (frequency_type) {
            case enums_1.FREQUENCY_TYPE_ENUM.hour:
                date.setHours(date.getHours() + frequency);
                break;
            case enums_1.FREQUENCY_TYPE_ENUM.day:
                date.setDate(date.getDate() + frequency);
                break;
            case enums_1.FREQUENCY_TYPE_ENUM.week:
                date.setDate(date.getDate() + (7 * frequency));
                break;
            case enums_1.FREQUENCY_TYPE_ENUM.month:
                date.setMonth(date.getMonth() + frequency);
                break;
            case enums_1.FREQUENCY_TYPE_ENUM.year:
                date.setFullYear(date.getFullYear() + frequency);
                break;
        }
        return date;
    };
    Utils.get_next_ncf = function (ncf_type, setting) {
        return __awaiter(this, void 0, void 0, function () {
            var ncfModel, ncfs, ncf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!ncf_type) {
                            return [2 /*return*/];
                        }
                        ncfModel = new base_model_1.BaseModel(ncf_schema_1.NcfSchema, enums_1.COLLECTION_NAME_ENUM.ncf);
                        return [4 /*yield*/, ncfModel.filter({
                                setting: setting,
                                status: enums_1.NCF_STATUS_ENUM.active,
                                type: ncf_type ? new mongoose_1.mongo.ObjectId(ncf_type._id) : '',
                                $and: [{
                                        $or: [
                                            { end_date: null },
                                            { end_date: { $exists: false } },
                                            { end_date: { $gte: new Date() } }
                                        ]
                                    }]
                            }, {}, { sequential: 1 }, 0, 1)];
                    case 1:
                        ncfs = _a.sent();
                        if (ncf_type && ncfs.length <= 0) {
                            throw new Error("Se agotaron los NCF del tipo " + ncf_type.name + ", es necesario agregar una nueva secuencia.");
                        }
                        if (!(ncfs.length > 0)) return [3 /*break*/, 3];
                        ncf = ncfs[0];
                        return [4 /*yield*/, ncfModel.update(ncf._id, { status: enums_1.NCF_STATUS_ENUM.used })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, ncf];
                }
            });
        });
    };
    Utils.convertion = function (rate, currency) {
        if (!rate)
            return 1;
        var rate_value = 1, c = rate.rates.filter(function (c) {
            return c._id == currency.toString() || c._id == (currency._id ? currency._id.toString() : '');
        });
        if (c.length > 0) {
            rate_value = (1 / c[0].value);
        }
        return rate_value;
    };
    Utils.generate_code = function (prefix, setting, model) {
        return __awaiter(this, void 0, void 0, function () {
            var year, start_date, end_date, number, docs, code_split, code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        year = new Date().getFullYear(), start_date = new Date(year, 0, 1, 0, 0, 0, 0), end_date = new Date(year, 11, 31, 23, 59, 59, 999), number = 0;
                        return [4 /*yield*/, model.filter({
                                setting: setting,
                                $and: [{
                                        create_date: {
                                            $gte: start_date
                                        }
                                    }, {
                                        create_date: {
                                            $lte: end_date
                                        }
                                    }]
                            }, {
                                code: 1
                            }, {
                                create_date: -1
                            }, 0, 1)];
                    case 1:
                        docs = _a.sent();
                        if (docs.length > 0 && docs[0].code) {
                            code_split = docs[0].code.split('-');
                            number = Number(code_split[2]);
                        }
                        code = prefix + "-" + year + "-" + (number + 1);
                        return [2 /*return*/, code];
                }
            });
        });
    };
    Utils.algorithm = 'aes-256-ctr';
    Utils.password = 'a@193746';
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map