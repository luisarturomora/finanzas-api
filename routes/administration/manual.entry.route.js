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
var manual_entry_controller_1 = require("../../controllers/administration/manual.entry.controller");
var ManualEntryRoute = /** @class */ (function (_super) {
    __extends(ManualEntryRoute, _super);
    function ManualEntryRoute(app) {
        var _this = this;
        var manualEntryController = new manual_entry_controller_1.ManualEntryController();
        _this = _super.call(this, app, manualEntryController) || this;
        _this.controller = manualEntryController;
        var route = express_1.Router();
        route.post("/api/v1/" + _this.controller.document_name + "/reject", function (req, res) {
            _this.controller.reject(req, res);
        });
        route.post("/api/v1/" + _this.controller.document_name + "/approve", function (req, res) {
            _this.controller.approve(req, res);
        });
        route.post("/api/v1/" + _this.controller.document_name + "/start_proccess", function (req, res) {
            _this.controller.start_proccess(req, res);
        });
        app.use(route);
        return _this;
    }
    return ManualEntryRoute;
}(base_router_1.BaseRoute));
exports.ManualEntryRoute = ManualEntryRoute;
//# sourceMappingURL=manual.entry.route.js.map