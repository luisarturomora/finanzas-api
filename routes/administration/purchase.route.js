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
var purchase_controller_1 = require("../../controllers/administration/purchase.controller");
var PurchaseRoute = /** @class */ (function (_super) {
    __extends(PurchaseRoute, _super);
    function PurchaseRoute(app) {
        var _this = this;
        var insuranceController = new purchase_controller_1.PurchaseController();
        _this = _super.call(this, app, insuranceController) || this;
        _this.controller = insuranceController;
        var route = express_1.Router();
        route.post("/api/v1/" + _this.controller.document_name + "/return", function (req, res) {
            _this.controller.return_purchase(req, res);
        });
        route.post("/api/v1/" + _this.controller.document_name + "/cancel", function (req, res) {
            _this.controller.return_purchase(req, res);
        });
        route.post("/api/v1/" + _this.controller.document_name + "/pending", function (req, res) {
            _this.controller.pending(req, res);
        });
        route.put("/api/v1/" + _this.controller.document_name + "/:_id/change_status", function (req, res) {
            _this.controller.change_status(req, res);
        });
        app.use(route);
        return _this;
    }
    return PurchaseRoute;
}(base_router_1.BaseRoute));
exports.PurchaseRoute = PurchaseRoute;
//# sourceMappingURL=purchase.route.js.map