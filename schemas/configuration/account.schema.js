"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var enums_1 = require("../../utils/enums");
var field_schema_1 = require("./field.schema");
exports.AccountSchema = new mongoose_1.Schema({
    code: String,
    name: String,
    color: String,
    type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.account_type
    },
    origin: String,
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.account,
        required: false
    },
    note: String,
    currency: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.currency
    },
    in_out_account: {
        type: Boolean,
        default: false
    },
    office: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.office,
        required: false
    },
    workflow: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.workflow,
        required: false
    },
    balance: Number,
    init_balance: Number,
    status: String,
    fields: [field_schema_1.FieldSchema],
    create_date: Date,
    create_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.user
    },
    setting: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.setting
    },
    account_statement: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.account_statements,
        required: false
    }
}, { toJSON: { virtuals: true } });
exports.AccountSchema.virtual('accounts', {
    ref: enums_1.COLLECTION_NAME_ENUM.account,
    localField: '_id',
    foreignField: 'parent'
});
exports.AccountSchema.virtual('account_entries', {
    ref: enums_1.COLLECTION_NAME_ENUM.account_entry,
    localField: '_id',
    foreignField: 'account'
});
//# sourceMappingURL=account.schema.js.map