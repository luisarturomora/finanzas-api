"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var enums_1 = require("../../utils/enums");
exports.UserSchema = new mongoose_1.Schema({
    name: String,
    last_name: String,
    password: String,
    user_name: String,
    email: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    roles: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: enums_1.COLLECTION_NAME_ENUM.role
        }],
    offices: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: enums_1.COLLECTION_NAME_ENUM.office
        }],
    currency: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.currency,
        required: false
    },
    status: String,
    create_date: Date,
    create_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.user,
        required: false
    },
    setting: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.setting
    }
});
//# sourceMappingURL=user.schema.js.map