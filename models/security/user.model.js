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
var user_schema_1 = require("../../schemas/security/user.schema");
var setting_schema_1 = require("../../schemas/administration/setting.schema");
var role_schema_1 = require("../../schemas/security/role.schema");
var utils_1 = require("../../utils/utils");
var enums_1 = require("../../utils/enums");
var base_model_1 = require("../base.model");
var office_schema_1 = require("../../schemas/administration/office.schema");
var UserModel = /** @class */ (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
        return _super.call(this, user_schema_1.UserSchema, 'user', {
            upload_name: 'image'
        }) || this;
    }
    UserModel.prototype.save = function (_user) {
        return __awaiter(this, void 0, void 0, function () {
            var settingModel, users, setting, user_quantity, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        _user.password = utils_1.Utils.encrypt(_user.password);
                        settingModel = new base_model_1.BaseModel(setting_schema_1.SettingSchema, 'setting');
                        return [4 /*yield*/, this.size({
                                user_name: _user.user_name
                            })];
                    case 1:
                        users = _a.sent(), setting = settingModel.get(_user.setting);
                        if (users > 0) {
                            throw new Error("El usuario " + _user.user_name + " ya existe en el sistema.");
                        }
                        if (!setting.max_user) return [3 /*break*/, 3];
                        return [4 /*yield*/, _super.prototype.size.call(this, { 'setting': setting._id })];
                    case 2:
                        user_quantity = _a.sent();
                        if (user_quantity >= _user.setting.max_user) {
                            throw new Error("Con el plan actual solo puede crear " + _user.setting.max_user + " usuarios.");
                        }
                        _a.label = 3;
                    case 3: return [4 /*yield*/, _super.prototype.save.call(this, _user)];
                    case 4:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, "Error registrando el usuario " + _user.user_name + "."];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.update = function (_id, _user) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (_user.password) {
                            _user.password = utils_1.Utils.encrypt(_user.password);
                        }
                        return [4 /*yield*/, _super.prototype.update.call(this, _id, _user)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, "Error actualizando el usuario " + _user.email];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.password_change = function (_user) {
        return __awaiter(this, void 0, void 0, function () {
            var users, edit_user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        _user.last_password = utils_1.Utils.encrypt(_user.last_password);
                        return [4 /*yield*/, this.filter({ email: _user.email, password: _user.last_password })];
                    case 1:
                        users = _a.sent();
                        if (users.length == 0) {
                            throw new Error("La contrase\u00F1a actual es incorrecta.");
                        }
                        edit_user = users[0];
                        edit_user.password = utils_1.Utils.encrypt(_user.password);
                        return [4 /*yield*/, _super.prototype.update.call(this, _user._id, edit_user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                result: true,
                                message: 'Contraseña modificada correctamente.'
                            }];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throw new Error("Error actualizando contrase\u00F1a.");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.login = function (_user) {
        return __awaiter(this, void 0, void 0, function () {
            var users, user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        console.log('login model');
                        _user.password = utils_1.Utils.encrypt(_user.password);
                        return [4 /*yield*/, this.filter({
                                user_name: _user.user_name,
                                password: _user.password,
                                status: enums_1.USER_STATUS_ENUM.actived
                            }, {
                                name: true,
                                user_name: true,
                                last_name: true,
                                roles: 1,
                                setting: 1
                            }, {}, 0, 1)];
                    case 1:
                        users = _a.sent();
                        if (users.length == 0) {
                            throw new Error("El usuario o contrase\u00F1a no es correcta, verifique los datos");
                        }
                        user = users[0];
                        return [2 /*return*/, user];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        throw new Error('A ocurrido un error iniciando sessión.');
                    case 3: return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.logged = function (_user) {
        return __awaiter(this, void 0, void 0, function () {
            var roleModel, officeModel, user, office_ids, role_ids, offices, roles, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        roleModel = new base_model_1.BaseModel(role_schema_1.RoleSchema, enums_1.COLLECTION_NAME_ENUM.role), officeModel = new base_model_1.BaseModel(office_schema_1.OfficeSchema, enums_1.COLLECTION_NAME_ENUM.office);
                        return [4 /*yield*/, this.get(_user._id)];
                    case 1:
                        user = _a.sent(), office_ids = user.offices.map(function (office) { return office._id; }), role_ids = user.roles.map(function (role) { return role._id; });
                        return [4 /*yield*/, officeModel.filter({
                                _id: { $in: office_ids }
                            }, {
                                _id: 1,
                                name: 1,
                                'fields.value': 1,
                                'fields.text': 1
                            })];
                    case 2:
                        offices = _a.sent();
                        return [4 /*yield*/, roleModel.filter({
                                _id: { $in: role_ids }
                            }, {
                                _id: 1,
                                name: 1,
                                modules: 1,
                                widgets: 1
                            })];
                    case 3:
                        roles = _a.sent();
                        user.roles = roles;
                        user.offices = offices;
                        return [2 /*return*/, user];
                    case 4:
                        error_5 = _a.sent();
                        console.log(error_5);
                        throw new Error('A ocurrido un error iniciando sessión.');
                    case 5: return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserModel;
}(base_model_1.BaseModel));
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map