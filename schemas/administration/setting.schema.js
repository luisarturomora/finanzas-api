"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var enums_1 = require("../../utils/enums");
exports.SettingSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    logo: {
        type: String,
        required: false
    },
    phone: String,
    rnc: String,
    address: String,
    email: {
        type: String,
        required: false
    },
    invoice_message: {
        type: String,
        required: false
    },
    office_fields: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'field'
        }],
    payment_message: {
        type: String,
        required: false
    },
    background: {
        type: String,
        required: false
    },
    change_account: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.account,
        required: false
    },
    currency: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.currency,
        required: false
    }
});
//# sourceMappingURL=setting.schema.js.map