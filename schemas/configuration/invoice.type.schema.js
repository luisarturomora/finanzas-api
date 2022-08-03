"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var enums_1 = require("../../utils/enums");
exports.InvoiceTypeSchema = new mongoose_1.Schema({
    code: String,
    description: String,
    account: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.account
    },
    fields: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: enums_1.COLLECTION_NAME_ENUM.field
        }],
    document_type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.document_type
    },
    create_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.user
    },
    setting: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.setting
    }
});
//# sourceMappingURL=invoice.type.schema.js.map