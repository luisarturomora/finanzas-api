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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var base_router_1 = require("../base.router");
var setting_controller_1 = require("../../controllers/administration/setting.controller");
var SettingRoute = /** @class */ (function (_super) {
    __extends(SettingRoute, _super);
    function SettingRoute(app) {
        var _this = this;
        var settingController = new setting_controller_1.SettingController();
        _this = _super.call(this, app, settingController) || this;
        _this.controller = settingController;
        var route = express_1.Router();
        route.get("/api/v1/" + _this.controller.document_name + "/get/current", function (req, res) {
            _this.controller.current(req, res);
        });
        app.use(route);
        return _this;
    }
    return SettingRoute;
}(base_router_1.BaseRoute));
exports.SettingRoute = SettingRoute;
//# sourceMappingURL=setting.route.js.map