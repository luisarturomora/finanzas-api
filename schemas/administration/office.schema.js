"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var field_schema_1 = require("../configuration/field.schema");
exports.OfficeSchema = new mongoose_1.Schema({
    name: String,
    code: {
        type: String,
        required: false
    },
    fields: [field_schema_1.FieldSchema],
    create_date: Date,
    home: {
        type: Boolean,
        required: false
    },
    school: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: false
    },
    create_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    setting: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'setting'
    }
});
//# sourceMappingURL=office.schema.js.map