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
var mongoose = require("mongoose");
var path_1 = require("path");
var fs_1 = require("fs");
var utils_1 = require("../utils/utils");
var BaseModel = /** @class */ (function () {
    function BaseModel(schema, document, config) {
        this.populates = [];
        this.schema = schema;
        this.document_name = document;
        if (schema) {
            for (var prop in schema.obj) {
                if (schema.obj[prop].ref || (schema.obj[prop][0] && schema.obj[prop][0].ref)) {
                    //let ref:string = schema.obj[prop].ref || schema.obj[prop][0].ref;
                    this.populates.push(prop);
                }
            }
            for (var prop in schema['virtuals']) {
                if (prop != 'id')
                    this.populates.push(prop);
            }
        }
        try {
            this.model = mongoose.model(document, this.schema);
        }
        catch (e) {
            this.model = mongoose.model(document);
        }
        this.config = config;
    }
    BaseModel.prototype.list = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var docs, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.find(params)];
                    case 1:
                        docs = _a.sent();
                        return [2 /*return*/, docs.map(function (doc) { return doc.toJSON(); })];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new Error("Error listado de " + this.document_name + ".");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseModel.prototype.get = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, request, i, populate, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        doc = void 0, request = this.model.findOne({ '_id': _id });
                        for (i = 0; i < this.populates.length; i++) {
                            populate = this.populates[i];
                            request = request.populate(populate);
                        }
                        return [4 /*yield*/, request.exec()];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, doc.toJSON()];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throw new Error("Error buscando " + this.document_name + ".");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseModel.prototype.delete = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.remove({ _id: _id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.document_name + " borrado correctamente."];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throw new Error("Error borrando " + this.document_name + ".");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseModel.prototype.upload = function (_object) {
        return __awaiter(this, void 0, void 0, function () {
            var setting_id, path_to_save, path, old_path, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        setting_id = this.document_name != 'setting' ? _object.setting.toString() : _object._id.toString(), path_to_save = this.document_name != 'setting' ? setting_id + "/" + this.document_name + "/" : setting_id + "/";
                        _object[this.config.upload_name] = _object[this.config.upload_name] ? _object[this.config.upload_name] : '';
                        path = path_1.join(process.cwd(), 'files', path_to_save), old_path = path_1.join(process.cwd(), 'files', 'temps', _object[this.config.upload_name]);
                        _object[this.config.upload_name] = _object[this.config.upload_name] || process.cwd() + "/assest/images/empty.png";
                        if (!fs_1.existsSync(path)) {
                            fs_1.mkdirSync(path);
                        }
                        return [4 /*yield*/, fs_1.renameSync(old_path, path + "/" + _object._id.toString() + ".png")];
                    case 1:
                        _a.sent();
                        _object[this.config.upload_name] = "" + path_to_save + _object._id.toString() + ".png";
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseModel.prototype.save = function (_object) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, obj, doc, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        if (!(this.config && this.config.code)) return [3 /*break*/, 2];
                        if (!this.config.code) return [3 /*break*/, 2];
                        _a = _object;
                        return [4 /*yield*/, utils_1.Utils.generate_code(this.config.code, _object.setting, this)];
                    case 1:
                        _a.code = _b.sent();
                        _b.label = 2;
                    case 2:
                        obj = new this.model(_object);
                        return [4 /*yield*/, obj.save()];
                    case 3:
                        doc = _b.sent();
                        if (!this.config) return [3 /*break*/, 5];
                        if (!this.config.upload_name) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.update(doc._id, doc)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/, doc.toJSON()];
                    case 6:
                        error_5 = _b.sent();
                        console.log(error_5);
                        throw new Error("Error guardando " + this.document_name + ".");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BaseModel.prototype.saveMeny = function (_objects) {
        return __awaiter(this, void 0, void 0, function () {
            var docs, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.create(_objects)];
                    case 1:
                        docs = _a.sent();
                        return [2 /*return*/, docs.map(function (doc) { return doc.toJSON(); })];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        throw new Error("Error guardando " + this.document_name + ".");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseModel.prototype.update = function (_id, _object) {
        return __awaiter(this, void 0, void 0, function () {
            var error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(_object);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!this.config) return [3 /*break*/, 3];
                        if (!this.config.upload_name) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.upload(_object)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.model.updateOne({ _id: _id }, _object, {})];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, this.document_name + " actualizado correctamente."];
                    case 5:
                        error_7 = _a.sent();
                        console.log(error_7);
                        throw new Error("Error actualizando " + this.document_name);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BaseModel.prototype.filter = function (params, fields, sort, skip, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var docs, match_1, populate_fields_1, prop, query_1, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        docs = [], match_1 = params.match, populate_fields_1 = {};
                        for (prop in fields) {
                            if (typeof (fields[prop]) == 'object') {
                                populate_fields_1[prop] = fields[prop];
                                delete fields[prop];
                            }
                        }
                        delete params.match;
                        query_1 = this.model.find(params, fields);
                        if (sort)
                            query_1.sort(sort);
                        if (skip)
                            query_1.skip(skip);
                        if (limit)
                            query_1.limit(limit);
                        this.populates.forEach(function (collection) {
                            var populate = {
                                path: collection
                            };
                            populate['match'] = match_1;
                            if (populate_fields_1[collection]) {
                                populate['select'] = populate_fields_1[collection];
                                query_1.populate(populate);
                            }
                            else {
                                if (!fields)
                                    query_1.populate(populate);
                            }
                        });
                        return [4 /*yield*/, query_1.exec()];
                    case 1:
                        docs = _a.sent();
                        return [2 /*return*/, docs.map(function (doc) { return doc.toJSON(); })];
                    case 2:
                        error_8 = _a.sent();
                        console.log(error_8);
                        throw new Error("Error filtrando datos de " + this.document_name + ".");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseModel.prototype.size = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var size, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.countDocuments(params).exec()];
                    case 1:
                        size = _a.sent();
                        return [2 /*return*/, size];
                    case 2:
                        error_9 = _a.sent();
                        console.log(error_9);
                        throw new Error("Error cargando cantidad de " + this.document_name + ".");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseModel.prototype.aggregate = function (match, sort, project, group, lookup, unwind, disk_usage) {
        if (disk_usage === void 0) { disk_usage = false; }
        return __awaiter(this, void 0, void 0, function () {
            var aggregates_1, aggregate, docs, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        aggregates_1 = [];
                        // if(unwind)
                        //     aggregates.push({
                        //         $unwind: unwind
                        //     })
                        if (lookup) {
                            lookup.forEach(function (lock) {
                                aggregates_1.push({
                                    $lookup: lock
                                });
                            });
                        }
                        // if (project)
                        //     aggregates.push({
                        //         $project: project
                        //     })
                        // if (sort)
                        //     aggregates.push({
                        //         $sort: sort
                        //     })
                        if (match)
                            aggregates_1.push({
                                $match: match
                            });
                        aggregate = this.model.aggregate(aggregates_1);
                        if (unwind)
                            aggregate.unwind(unwind);
                        if (group)
                            aggregate.group(group);
                        if (project)
                            aggregate.project(project);
                        if (sort)
                            aggregates_1.sort(sort);
                        // if (match)
                        //     aggregate.match(match);
                        // if (lookup) {
                        //     lookup.forEach((lock: any) => {
                        //         aggregate.lookup(lock);
                        //     })
                        // }
                        aggregate.allowDiskUse(disk_usage);
                        return [4 /*yield*/, aggregate.exec()];
                    case 1:
                        docs = _a.sent();
                        return [2 /*return*/, docs];
                    case 2:
                        error_10 = _a.sent();
                        console.log(error_10);
                        throw new Error("Error filtrando datos de " + this.document_name + ".");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
//# sourceMappingURL=base.model.js.map