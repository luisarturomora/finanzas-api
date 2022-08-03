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
var ncf_model_1 = require("../../models/administration/ncf.model");
var base_controller_1 = require("../base.controller");
var NcfController = /** @class */ (function (_super) {
    __extends(NcfController, _super);
    function NcfController() {
        var _this = this;
        var model = new ncf_model_1.NcfModel();
        _this = _super.call(this, model) || this;
        _this.document_name = 'ncf';
        return _this;
    }
    return NcfController;
}(base_controller_1.BaseController));
exports.NcfController = NcfController;
//# sourceMappingURL=ncf.controller.js.map