"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var enums_1 = require("../../utils/enums");
exports.PurchaseTypeSchema = new mongoose_1.Schema({
    name: String,
    description: {
        type: String,
        required: false
    },
    fields: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: enums_1.COLLECTION_NAME_ENUM.field
        }],
    account: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.account
    },
    document_type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.document_type
    },
    create_date: Date,
    create_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.user
    },
    setting: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.setting
    }
});
//# sourceMappingURL=purchase.type.schema.js.map