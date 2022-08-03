"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer = require('multer');
var path_1 = require("path");
var BaseRoute = /** @class */ (function () {
    function BaseRoute(app, controller) {
        var _this = this;
        this.controller = controller;
        var route = express_1.Router();
        route.get("/api/v1/" + this.controller.document_name, function (req, res) {
            _this.controller.list(req, res);
        });
        route.get("/api/v1/" + this.controller.document_name + "/:_id", function (req, res) {
            _this.controller.get(req, res);
        });
        route.post("/api/v1/" + this.controller.document_name, function (req, res) {
            _this.controller.save(req, res);
        });
        route.put("/api/v1/" + this.controller.document_name + "/:_id", function (req, res) {
            _this.controller.update(req, res);
        });
        route.delete("/api/v1/" + this.controller.document_name + "/:_id", function (req, res) {
            _this.controller.delete(req, res);
        });
        /**
         * Advance services
         */
        route.post("/api/v1/" + this.controller.document_name + "/size", function (req, res) {
            _this.controller.size(req, res);
        });
        route.post("/api/v1/" + this.controller.document_name + "/filter", function (req, res) {
            _this.controller.filter(req, res);
        });
        route.post("/api/v1/" + this.controller.document_name + "/aggregate", function (req, res) {
            _this.controller.aggregate(req, res);
        });
        var temp_path = path_1.join(process.cwd(), '/files/temps/');
        route.post("/api/v1/" + this.controller.document_name + "/upload", multer({
            dest: temp_path
        }).single(this.controller.document_name), function (req, res) {
            var file = req['file'];
            res.json({
                file: file,
                result: true
            });
        });
        app.use(route);
    }
    return BaseRoute;
}());
exports.BaseRoute = BaseRoute;
//# sourceMappingURL=base.router.js.map