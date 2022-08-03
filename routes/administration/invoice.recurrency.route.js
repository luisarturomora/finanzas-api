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
var invoice_recurrency_controller_1 = require("../../controllers/administration/invoice.recurrency.controller");
var InvoiceRecurrencyRoute = /** @class */ (function (_super) {
    __extends(InvoiceRecurrencyRoute, _super);
    function InvoiceRecurrencyRoute(app) {
        var _this = this;
        var invoiceRecurrencyController = new invoice_recurrency_controller_1.InvoiceRecurrencyController(), route = express_1.Router();
        _this = _super.call(this, app, invoiceRecurrencyController) || this;
        _this.controller = invoiceRecurrencyController;
        route.post("/api/v1/" + _this.controller.document_name + "/:_id/payment", function (req, res) {
            _this.controller['payment'](req, res);
        });
        route.post("/api/v1/" + _this.controller.document_name + "/contract/print", function (req, res) {
            _this.controller.contractPrint(req, res);
        });
        route.get("/api/v1/" + _this.controller.document_name + "/:_id/suspend", function (req, res) {
            _this.controller.suspend(req, res);
        });
        app.use(route);
        return _this;
    }
    return InvoiceRecurrencyRoute;
}(base_router_1.BaseRoute));
exports.InvoiceRecurrencyRoute = InvoiceRecurrencyRoute;
//# sourceMappingURL=invoice.recurrency.route.js.map