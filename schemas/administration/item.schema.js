"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var field_schema_1 = require("../configuration/field.schema");
var enums_1 = require("../../utils/enums");
exports.ItemSchema = new mongoose_1.Schema({
    name: String,
    note: {
        type: String,
        default: ''
    },
    code: String,
    value: Number,
    item_type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.item_type
    },
    taxes: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: enums_1.COLLECTION_NAME_ENUM.tax
        }],
    service: {
        type: Boolean,
        default: false
    },
    itbis: Number,
    process: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: enums_1.COLLECTION_NAME_ENUM.item_process
        }],
    discount_type: {
        type: String,
        required: false
    },
    discount: {
        type: Number,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    fields: [field_schema_1.FieldSchema],
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
exports.ItemSchema.virtual('configs', {
    ref: enums_1.COLLECTION_NAME_ENUM.package_config,
    localField: '_id',
    foreignField: 'item'
});
//# sourceMappingURL=item.schema.js.map