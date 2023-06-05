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
var user_controller_1 = require("../../controllers/security/user.controller");
var base_router_1 = require("../base.router");
var UserRoute = /** @class */ (function (_super) {
    __extends(UserRoute, _super);
    function UserRoute(app) {
        var _this = this;
        var userController = new user_controller_1.UserController();
        _this = _super.call(this, app, userController) || this;
        _this.controller = userController;
        var route = express_1.Router();
        route.post('/api/v0/user/login', function (req, res) {
            console.log('login route');
            _this.controller.login(req, res);
        });
        route.post('/api/v1/user/logged', function (req, res) {
            _this.controller.logged(req, res);
        });
        route.post('/api/v1/user/logout', function (req, res) {
            _this.controller.logout(req, res);
        });
        route.post('/api/v1/user/password', function (req, res) {
            _this.controller.password_change(req, res);
        });
        route.get('/api/v0/user/:name/setting', function (req, res) {
            _this.controller.setting(req, res);
        });
        route.get('/api/v1/user/session/keepalive', function (req, res) {
            res.json({
                result: true
            });
        });
        app.use(route);
        return _this;
    }
    return UserRoute;
}(base_router_1.BaseRoute));
exports.UserRoute = UserRoute;
//# sourceMappingURL=user.route.js.map