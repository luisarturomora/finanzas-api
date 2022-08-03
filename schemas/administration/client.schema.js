"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var field_schema_1 = require("../configuration/field.schema");
var enums_1 = require("../../utils/enums");
exports.ClientSchema = new mongoose_1.Schema({
    name: String,
    last_name: String,
    type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.client_type
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
});
//# sourceMappingURL=client.schema.js.map