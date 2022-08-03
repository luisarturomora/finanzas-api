"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var field_schema_1 = require("../configuration/field.schema");
exports.ProviderSchema = new mongoose_1.Schema({
    name: String,
    last_name: String,
    type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'provider_type'
    },
    fields: [field_schema_1.FieldSchema],
    create_date: Date,
    create_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    setting: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'setting'
    }
});
//# sourceMappingURL=provider.schema.js.map