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
var base_model_1 = require("../models/base.model");
var mongoose_1 = require("mongoose");
var event_log_schema_1 = require("../schemas/security/event.log.schema");
var enums_1 = require("../utils/enums");
var BaseController = /** @class */ (function () {
    function BaseController(model, document_name, schema, config) {
        this.document_name = document_name;
        if (model) {
            this.model = model;
        }
        else {
            if (config) {
                this.model = new base_model_1.BaseModel(schema, document_name, config);
            }
            else {
                this.model = new base_model_1.BaseModel(schema, document_name, null);
            }
        }
    }
    BaseController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var params, docs, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        params = {};
                        params['setting'] = new mongoose_1.mongo.ObjectId(req['user'].setting);
                        return [4 /*yield*/, this.model.list(params)];
                    case 1:
                        docs = _a.sent();
                        res.json({
                            result: true,
                            docs: docs
                        });
                        this.eventLog(req, enums_1.EVENT_LOG_ENUM.list);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.json({
                            result: false,
                            error: error_1.message,
                            message: "Error mostrando listado de " + this.document_name
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseController.prototype.get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, doc, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = req.params['_id'];
                        return [4 /*yield*/, this.model.get(_id)];
                    case 1:
                        doc = _a.sent();
                        res.json({
                            result: true,
                            doc: doc
                        });
                        this.eventLog(req, enums_1.EVENT_LOG_ENUM.details);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.json({
                            result: false,
                            error: error_2.message,
                            message: "Error buscando " + this.document_name
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseController.prototype.save = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var object, doc, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        object = req.body;
                        delete object['_id'];
                        object.create_user = new mongoose_1.mongo.ObjectId(req['user']._id);
                        object.setting = new mongoose_1.mongo.ObjectId(req['user'].setting);
                        object.create_date = new Date();
                        object.update_date = new Date();
                        return [4 /*yield*/, this.model.save(object)];
                    case 1:
                        doc = _a.sent();
                        res.json({
                            result: true,
                            doc: doc,
                            message: this.document_name + " guardado correctamente."
                        });
                        this.eventLog(req, enums_1.EVENT_LOG_ENUM.save);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.json({
                            result: false,
                            error: error_3.message,
                            message: "Error guardando " + this.document_name
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, object, message, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = req.params['_id'], object = req.body;
                        object.update_date = new Date();
                        if (!object.setting) {
                            object.setting = new mongoose_1.mongo.ObjectId(req['user'].setting);
                        }
                        else {
                            object.setting = new mongoose_1.mongo.ObjectId(req['user'].setting);
                        }
                        return [4 /*yield*/, this.model.update(_id, object)];
                    case 1:
                        message = _a.sent();
                        res.json({
                            result: true,
                            message: this.document_name + " actualizado correctamente."
                        });
                        this.eventLog(req, enums_1.EVENT_LOG_ENUM.update);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        res.json({
                            result: false,
                            error: error_4.message,
                            message: "Error modificando " + this.document_name
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, message, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = req.params['_id'];
                        return [4 /*yield*/, this.model.delete(_id)];
                    case 1:
                        message = _a.sent();
                        res.json({
                            result: true,
                            message: this.document_name + " borrado correctamente."
                        });
                        this.eventLog(req, enums_1.EVENT_LOG_ENUM.delete);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        res.json({
                            result: false,
                            error: error_5.message,
                            message: "Error borrando " + this.document_name
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseController.prototype.replaceRegEx = function (obj) {
        for (var prop in obj) {
            var o = obj[prop];
            if (typeof (o) == 'string') {
                if (o.length > 3 && o[0] == '/' && o[o.length - 1] == '/') {
                    o = o.replace(new RegExp('/', 'g'), '');
                    obj[prop] = new RegExp(o, "gi");
                }
            }
            else if (o._bsontype == 'ObjectID') {
                obj[prop] = o;
            }
            else if (typeof (o) == 'object') {
                obj[prop] = this.replaceRegEx(o);
            }
        }
        return obj;
    };
    BaseController.prototype.filter = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var params, fields, sort, limit, skip, docs, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        req.body.params = this.add_object_id(req.body.params);
                        params = this.replaceRegEx(req.body.params) || {}, fields = req.body.fields || {}, sort = req.body.sort || {}, limit = req.body.limit || 0, skip = req.body.skip;
                        params['$or'] = [{
                                setting: new mongoose_1.mongo.ObjectId(req['user'].setting)
                            }, {
                                setting: { $exists: false }
                            }];
                        return [4 /*yield*/, this.model.filter(params, fields, sort, skip, limit)];
                    case 1:
                        docs = _a.sent();
                        res.json({
                            result: true,
                            docs: docs
                        });
                        this.eventLog(req, enums_1.EVENT_LOG_ENUM.filter);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        res.json({
                            result: false,
                            error: error_6.message,
                            message: "Error filtrando " + this.document_name
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseController.prototype.size = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var params, size, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        req.body.params = this.add_object_id(req.body.params);
                        params = this.replaceRegEx(req.body.params) || {};
                        params['$or'] = [{
                                setting: new mongoose_1.mongo.ObjectId(req['user'].setting)
                            }, {
                                setting: { $exists: false }
                            }];
                        return [4 /*yield*/, this.model.size(params)];
                    case 1:
                        size = _a.sent();
                        res.json({
                            result: true,
                            size: size
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        res.json({
                            result: false,
                            message: error_7
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseController.prototype.add_object_id = function (object) {
        var match = {};
        for (var prop in (object || {})) {
            if (object[prop].object_id) {
                if (object[prop].values)
                    match[prop] = object[prop].values.map(function (value) { return new mongoose_1.mongo.ObjectId(value); });
                if (object[prop].value)
                    match[prop] = new mongoose_1.mongo.ObjectId(object[prop].value);
            }
            else if (object[prop].date) {
                match[prop] = new Date(object[prop].value);
            }
            else if (typeof (object[prop]) == 'object' && object[prop].length >= 0)
                match[prop] = object[prop];
            else if (typeof (object[prop]) == 'object') {
                match[prop] = this.add_object_id(object[prop]);
            }
            else {
                match[prop] = object[prop];
            }
        }
        return match;
    };
    BaseController.prototype.aggregate = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var $match, disk_usage, docs, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        $match = this.add_object_id(req.body.$match), disk_usage = req.body.disk_usage || false;
                        return [4 /*yield*/, this.model.aggregate($match, req.body.$sort, req.body.$project, req.body.$group, req.body.$lookup, req.body.$unwind, disk_usage)];
                    case 1:
                        docs = _a.sent();
                        res.json({
                            result: true,
                            docs: docs
                        });
                        this.eventLog(req, 'Filtrar');
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        res.json({
                            result: false,
                            message: error_8
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseController.prototype.eventLog = function (req, action) {
        return __awaiter(this, void 0, void 0, function () {
            var body, event_log, eventLogModel;
            return __generator(this, function (_a) {
                try {
                    body = void 0;
                    if (req.body) {
                        try {
                            body = JSON.stringify(req.body).replace(/$/g, '');
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    event_log = {
                        module: this.document_name,
                        action: action,
                        object: req.body ? body : req.params,
                        create_date: new Date(),
                        create_user: req['user'] ? new mongoose_1.mongo.ObjectId(req['user']._id) : undefined,
                        setting: req['user'] ? new mongoose_1.mongo.ObjectId(req['user'].setting) : undefined
                    };
                    eventLogModel = new base_model_1.BaseModel(event_log_schema_1.EventLogSchema, 'eventLog');
                    eventLogModel.save(event_log);
                }
                catch (error) {
                    console.log(error);
                    throw new Error("Error guardando log de eventos.");
                }
                return [2 /*return*/];
            });
        });
    };
    return BaseController;
}());
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map