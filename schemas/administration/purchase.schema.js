"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var item_schema_1 = require("./item.schema");
var enums_1 = require("../../utils/enums");
var field_schema_1 = require("../configuration/field.schema");
var convertion_rate_schema_1 = require("./convertion.rate.schema");
exports.PurchaseSchema = new mongoose_1.Schema({
    provider: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.provider
    },
    date: Date,
    expire_date: {
        type: Date,
        required: false
    },
    account: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.account
    },
    type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.purchase_type
    },
    fields: [field_schema_1.FieldSchema],
    currency: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.currency
    },
    convertion_rate: convertion_rate_schema_1.ConvertionRateSchema,
    code: String,
    items: [item_schema_1.ItemSchema],
    office: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.office
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
    note: {
        type: String,
        required: false
    },
    recurrency: {
        type: Boolean,
        default: false
    },
    frequency: {
        type: Number,
        required: false
    },
    recurrency_end: {
        type: Date,
        required: false
    },
    purchase_order: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.purchase_order,
        required: false
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
}, { toJSON: { virtuals: true } });
exports.PurchaseSchema.virtual('payments', {
    ref: enums_1.COLLECTION_NAME_ENUM.payment,
    localField: '_id',
    foreignField: 'purchases',
    justOne: false
});
//# sourceMappingURL=purchase.schema.js.map