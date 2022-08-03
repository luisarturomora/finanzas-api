"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.AcknowledgmentSchema = new mongoose_1.Schema({
    client: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'client'
    },
    date: Date,
    number: Number,
    items: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'item'
        }],
    employees: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'employee'
        }],
    office: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'office'
    },
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
//# sourceMappingURL=acknowledgment.schema.js.map