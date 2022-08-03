"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var field_schema_1 = require("../configuration/field.schema");
var enums_1 = require("../../utils/enums");
exports.EmployeeSchema = new mongoose_1.Schema({
    name: String,
    last_name: String,
    salary: Number,
    position: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.position
    },
    commission: Number,
    fields: [field_schema_1.FieldSchema],
    items: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: enums_1.COLLECTION_NAME_ENUM.item_commission
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
//# sourceMappingURL=employee.schema.js.map