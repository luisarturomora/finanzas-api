"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var enums_1 = require("../../utils/enums");
var item_schema_1 = require("./item.schema");
var field_schema_1 = require("../configuration/field.schema");
exports.InvoiceRecurrencySchema = new mongoose_1.Schema({
    client: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.client
    },
    office: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.office
    },
    number: Number,
    start_date: Date,
    end_date: Date,
    recurrency: {
        type: Boolean,
        default: false
    },
    frequency: {
        type: Number,
        required: false
    },
    type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.invoice_type,
        required: false,
    },
    ncf_type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.ncf_type
    },
    account: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.account
    },
    fields: [field_schema_1.FieldSchema],
    currency: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.currency
    },
    items: [item_schema_1.ItemSchema],
    status: String,
    note: {
        type: String,
        required: false
    },
    invoices: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: enums_1.COLLECTION_NAME_ENUM.invoice
        }],
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
//# sourceMappingURL=invoice.recurrency.schema.js.map