"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var enums_1 = require("../../utils/enums");
exports.AccountStatementSchema = new mongoose_1.Schema({
    code: String,
    name: String,
    origin: String,
    office: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.office,
        required: false
    },
    create_date: Date,
    create_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.user
    },
    isTitle: Boolean,
    title: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.account_statements
    },
    inBilancio: Boolean,
    codeBilancio: String,
    nameBilancio: String,
    shareWithOther: Boolean,
    shareWith: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.account_statements
    }
}, { toJSON: { virtuals: true } });
//# sourceMappingURL=account.statements.js.map