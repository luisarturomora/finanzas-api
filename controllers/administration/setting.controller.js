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
var setting_model_1 = require("../../models/administration/setting.model");
var base_controller_1 = require("../base.controller");
var utils_1 = require("../../utils/utils");
var SettingController = /** @class */ (function (_super) {
    __extends(SettingController, _super);
    function SettingController() {
        var _this = this;
        var model = new setting_model_1.SettingModel();
        _this = _super.call(this, model) || this;
        _this.document_name = 'setting';
        return _this;
    }
    SettingController.prototype.current = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var config, is_saas, settings, user, setting, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        config = utils_1.Config(), is_saas = config['is_saas'];
                        if (!!is_saas) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.model.filter({}, null, null, 0, 1)];
                    case 1:
                        settings = _a.sent();
                        if (settings.length > 0) {
                            settings[0].is_saas = is_saas;
                            res.json({
                                result: true,
                                setting: settings[0]
                            });
                        }
                        else {
                            res.json({
                                result: true,
                                setting: {
                                    name: 'FINANZAS',
                                    logo: 'assets/images/logo-icon.png',
                                    background: 'assets/images/background/login-register.png',
                                    email: 'revolutionbi@gmail.com',
                                    "primary_text_color": "#ffffff",
                                    "primary_background_color": "#0080ff",
                                    "text_color": "#000000",
                                    "background_color": "#ffffff",
                                    is_saas: is_saas
                                }
                            });
                        }
                        return [3 /*break*/, 5];
                    case 2:
                        if (!req['user']) return [3 /*break*/, 4];
                        user = req['user'];
                        return [4 /*yield*/, this.model.get(user.setting)];
                    case 3:
                        setting = _a.sent();
                        res.json({
                            result: true,
                            setting: setting
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        res.json({
                            result: true,
                            setting: {
                                name: 'FINANZAS',
                                logo: 'assets/images/logo-icon.png',
                                background: 'assets/images/background/login-register.png',
                                email: 'plistats@gmail.com',
                                "primary_text_color": "#ffffff",
                                "primary_background_color": "#0080ff",
                                "text_color": "#000000",
                                "background_color": "#ffffff",
                                is_saas: is_saas
                            }
                        });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, {
                                result: false,
                                message: 'Error buscando configuración por defecto.'
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return SettingController;
}(base_controller_1.BaseController));
exports.SettingController = SettingController;
//# sourceMappingURL=setting.controller.js.map