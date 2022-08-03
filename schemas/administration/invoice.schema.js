"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var employee_schema_1 = require("./employee.schema");
var enums_1 = require("../../utils/enums");
var field_schema_1 = require("../configuration/field.schema");
var convertion_rate_schema_1 = require("./convertion.rate.schema");
exports.InvoiceSchema = new mongoose_1.Schema({
    client: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.client
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
        ref: enums_1.COLLECTION_NAME_ENUM.invoice_type
    },
    fields: [field_schema_1.FieldSchema],
    currency: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.currency
    },
    convertion_rate: convertion_rate_schema_1.ConvertionRateSchema,
    code: String,
    items: [Object],
    employees: [employee_schema_1.EmployeeSchema],
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
    acknowledgments: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: enums_1.COLLECTION_NAME_ENUM.acknowledgment
        }],
    note: {
        type: String,
        required: false
    },
    recurrency: {
        type: Boolean,
        default: false
    },
    quotation: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.quotation,
        required: false
    },
    frequency: {
        type: Number,
        required: false
    },
    recurrency_end: {
        type: Date,
        required: false
    },
    debit_note: {
        type: Number,
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
exports.InvoiceSchema.virtual('payments', {
    ref: 'payment',
    localField: '_id',
    foreignField: 'invoices',
    justOne: false
});
//# sourceMappingURL=invoice.schema.js.map