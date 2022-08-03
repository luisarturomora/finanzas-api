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
var user_model_1 = require("../../models/security/user.model");
var base_controller_1 = require("../base.controller");
var enums_1 = require("../../utils/enums");
var utils_1 = require("../../utils/utils");
var jwt = require('jsonwebtoken');
var UserController = /** @class */ (function (_super) {
    __extends(UserController, _super);
    function UserController() {
        var _this = this;
        var model = new user_model_1.UserModel(), config = utils_1.Config();
        _this = _super.call(this, model) || this;
        _this.document_name = 'user';
        _this.model = model;
        _this.sessionConfig = config['sessionConfig'];
        return _this;
    }
    UserController.prototype.setting = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.filter({ name: req.params.name }, {
                                setting: {
                                    name: 1,
                                    description: 1,
                                    background: 1,
                                    logo: 1,
                                    background_color: 1,
                                    text_color: 1,
                                    primary_background_color: 1,
                                    primary_text_color: 1,
                                }
                            })];
                    case 1:
                        users = _a.sent();
                        if (users.length > 0) {
                            res.json({
                                result: true,
                                setting: users[0].setting
                            });
                        }
                        else {
                            res.json({
                                result: false,
                                message: 'No se encontro la confiruración.'
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        res.json({
                            result: false,
                            message: 'No se encontro la confiruración.'
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _user, user, profile, options, token, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _user = req.body;
                        return [4 /*yield*/, this.model.login(_user)];
                    case 1:
                        user = _a.sent(), profile = {
                            user_name: user.user_name,
                            name: user.name + " " + user.last_name,
                            _id: user._id.toString(),
                            setting: user.setting.toString()
                        }, options = Object.assign({}, this.sessionConfig.options);
                        token = jwt.sign(profile, this.sessionConfig.secret, options);
                        res.json({
                            result: true,
                            token: token
                        });
                        this.eventLog(req, enums_1.EVENT_LOG_ENUM.signIn);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        res.json({
                            result: false,
                            message: e_2.message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.logged = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _user, user, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _user = req['user'];
                        return [4 /*yield*/, this.model.logged(_user)];
                    case 1:
                        user = _a.sent();
                        res.json({
                            user: user,
                            result: true
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        res.json({
                            result: false,
                            message: e_3.message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.logout = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                delete req['finanza_user'];
                res.json({
                    result: true,
                    message: 'Session cerrada correctamente.'
                });
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.password_change = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        user = req.body;
                        return [4 /*yield*/, this.model.password_change(user)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.eventLog(req, enums_1.EVENT_LOG_ENUM.passwordChange)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.json(result)];
                    case 3:
                        e_4 = _a.sent();
                        return [2 /*return*/, res.json({
                                result: false,
                                message: e_4.message
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}(base_controller_1.BaseController));
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map