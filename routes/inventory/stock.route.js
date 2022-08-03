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
var stock_controller_1 = require("../../controllers/administration/stock.controller");
var StockRoute = /** @class */ (function (_super) {
    __extends(StockRoute, _super);
    function StockRoute(app) {
        var _this = this;
        var stockController = new stock_controller_1.StockController();
        _this = _super.call(this, app, stockController) || this;
        _this.controller = stockController;
        var route = express_1.Router();
        route.post("/api/v1/" + _this.controller.document_name + "/transfer", function (req, res) {
            _this.controller.transfer(req, res);
        });
        app.use(route);
        return _this;
    }
    return StockRoute;
}(base_router_1.BaseRoute));
exports.StockRoute = StockRoute;
//# sourceMappingURL=stock.route.js.map