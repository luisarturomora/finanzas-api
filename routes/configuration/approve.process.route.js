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
var approve_process_controller_1 = require("../../controllers/configuration/approve.process.controller");
var ApproveProcessRoute = /** @class */ (function (_super) {
    __extends(ApproveProcessRoute, _super);
    function ApproveProcessRoute(app) {
        var _this = this;
        var approveProcessController = new approve_process_controller_1.ApproveProcessController();
        _this = _super.call(this, app, approveProcessController) || this;
        _this.controller = approveProcessController;
        var route = express_1.Router();
        route.post("/api/v1/" + _this.controller.document_name + "/reject", function (req, res) {
            _this.controller.reject(req, res);
        });
        route.post("/api/v1/" + _this.controller.document_name + "/approve", function (req, res) {
            _this.controller.approve(req, res);
        });
        app.use(route);
        return _this;
    }
    return ApproveProcessRoute;
}(base_router_1.BaseRoute));
exports.ApproveProcessRoute = ApproveProcessRoute;
//# sourceMappingURL=approve.process.route.js.map