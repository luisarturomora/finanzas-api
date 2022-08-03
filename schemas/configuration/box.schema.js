"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.BoxSchema = new mongoose_1.Schema({
    name: String,
    office: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'office'
    },
    status: String,
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
//# sourceMappingURL=box.schema.js.map