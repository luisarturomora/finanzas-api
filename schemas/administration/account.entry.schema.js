"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var enums_1 = require("../../utils/enums");
var field_schema_1 = require("../configuration/field.schema");
var entry_message_schema_1 = require("./entry.message.schema");
exports.AccountEntrySchema = new mongoose_1.Schema({
    note: String,
    origin: String,
    amount: Number,
    date: Date,
    message: {
        type: entry_message_schema_1.EntryMessageSchema,
        required: false
    },
    history: [{
            type: Object,
            required: false
        }],
    invoice: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.invoice,
        required: false
    },
    payment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.payment,
        required: false
    },
    debit_note: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.debit_note,
        required: false
    },
    credit_note: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.credit_note,
        required: false
    },
    purchase: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.purchase,
        required: false
    },
    item: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.item,
        required: false
    },
    tax: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.tax,
        required: false
    },
    payment_deposit: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.payment_deposit,
        required: false
    },
    document_type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.document_type,
        required: false
    },
    account: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.account
    },
    currency: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.currency
    },
    manual_entry: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.manual_entry,
        required: false
    },
    fields: [field_schema_1.FieldSchema],
    create_date: Date,
    create_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.user
    },
    user: {
        required: false,
        type: String
    },
    setting: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.setting
    }
});
//# sourceMappingURL=account.entry.schema.js.map