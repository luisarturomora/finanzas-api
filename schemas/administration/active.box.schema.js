"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.ActiveBoxSchema = new mongoose_1.Schema({
    opening_amount: Number,
    box: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'box'
    },
    end_date: {
        type: Date,
        required: false
    },
    totals: {
        type: Object,
        required: false
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
//# sourceMappingURL=active.box.schema.js.map