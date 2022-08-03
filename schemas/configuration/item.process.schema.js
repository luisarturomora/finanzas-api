"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var enums_1 = require("../../utils/enums");
exports.ItemProcessSchema = new mongoose_1.Schema({
    document_type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.document_type
    },
    account: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.account
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
});
//# sourceMappingURL=item.process.schema.js.map