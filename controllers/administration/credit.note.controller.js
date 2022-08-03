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
var base_controller_1 = require("../base.controller");
var enums_1 = require("../../utils/enums");
var credit_note_model_1 = require("../../models/administration/credit.note.model");
var CrebitNoteController = /** @class */ (function (_super) {
    __extends(CrebitNoteController, _super);
    function CrebitNoteController() {
        var _this = this;
        var model = new credit_note_model_1.CreditNoteModel();
        _this = _super.call(this, model) || this;
        _this.model = model;
        _this.document_name = enums_1.COLLECTION_NAME_ENUM.credit_note;
        return _this;
    }
    return CrebitNoteController;
}(base_controller_1.BaseController));
exports.CrebitNoteController = CrebitNoteController;
//# sourceMappingURL=credit.note.controller.js.map