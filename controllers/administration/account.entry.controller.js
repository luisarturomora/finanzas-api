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
var account_entry_model_1 = require("../../models/administration/account.entry.model");
var AccountEntryController = /** @class */ (function (_super) {
    __extends(AccountEntryController, _super);
    function AccountEntryController() {
        var _this = this;
        var model = new account_entry_model_1.AccountEntryModel();
        _this = _super.call(this, model) || this;
        _this.model = model;
        _this.document_name = enums_1.COLLECTION_NAME_ENUM.account_entry;
        return _this;
    }
    return AccountEntryController;
}(base_controller_1.BaseController));
exports.AccountEntryController = AccountEntryController;
//# sourceMappingURL=account.entry.controller.js.map