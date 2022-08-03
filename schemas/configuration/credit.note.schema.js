"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var enums_1 = require("../../utils/enums");
var item_schema_1 = require("../administration/item.schema");
var invoice_schema_1 = require("../administration/invoice.schema");
var purchase_schema_1 = require("../administration/purchase.schema");
exports.CreditNoteSchema = new mongoose_1.Schema({
    note: String,
    code: String,
    date: Date,
    client: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.client,
        required: false
    },
    provider: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.provider,
        required: false
    },
    invoice: {
        type: invoice_schema_1.InvoiceSchema,
        required: false
    },
    purchase: {
        type: purchase_schema_1.PurchaseSchema,
        required: false
    },
    type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.debit_note_type,
        required: false
    },
    status: String,
    ncf_type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.ncf_type
    },
    ncf: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.ncf,
        required: false
    },
    items: [item_schema_1.ItemSchema],
    currency: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.currency,
        required: false
    },
    office: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.office,
        required: false
    },
    value: Number,
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
//# sourceMappingURL=credit.note.schema.js.map