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
var acknowledgment_controller_1 = require("../../controllers/administration/acknowledgment.controller");
var AcknowledgmentRoute = /** @class */ (function (_super) {
    __extends(AcknowledgmentRoute, _super);
    function AcknowledgmentRoute(app) {
        var _this = this;
        var insuranceController = new acknowledgment_controller_1.AcknowledgmentController();
        _this = _super.call(this, app, insuranceController) || this;
        _this.controller = insuranceController;
        var route = express_1.Router();
        route.post("/api/v1/" + _this.controller.document_name + "/cancel", function (req, res) {
            _this.controller.cancel(req, res);
        });
        app.use(route);
        return _this;
    }
    return AcknowledgmentRoute;
}(base_router_1.BaseRoute));
exports.AcknowledgmentRoute = AcknowledgmentRoute;
//# sourceMappingURL=acknowledgment.route.js.map