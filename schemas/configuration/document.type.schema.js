"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var enums_1 = require("../../utils/enums");
exports.DocumentTypeSchema = new mongoose_1.Schema({
    description: String,
    entry_origin: String,
    origin: String,
    account_category: String,
    account_category2: String,
    workflow: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.workflow,
        required: false
    },
    create_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.user
    },
    create_date: Date,
    setting: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.setting
    }
});
//# sourceMappingURL=document.type.schema.js.map