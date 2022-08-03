"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.PackageSchema = new mongoose_1.Schema({
    quantity: Number,
    config: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'package_config'
    },
    date: Date,
    number: Number,
    status: String,
    note: {
        type: String,
        required: false
    },
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
//# sourceMappingURL=package.schema.js.map