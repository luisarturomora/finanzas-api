"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var account_entry_schema_1 = require("./account.entry.schema");
var enums_1 = require("../../utils/enums");
exports.ManualEntrySchema = new mongoose_1.Schema({
    code: String,
    date: Date,
    inout_account: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.account
    },
    entries: [account_entry_schema_1.AccountEntrySchema],
    note: String,
    currency: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.currency
    },
    document_type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.document_type
    },
    office: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.office,
        required: false
    },
    year: {
        type: mongoose_1.Schema.Types.Number,
        required: false
    },
    month: {
        type: mongoose_1.Schema.Types.Number,
        required: false
    },
    workflow: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.workflow,
        required: false
    },
    status: String,
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
//# sourceMappingURL=manual.entry.schema.js.map