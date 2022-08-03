"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.StockSchema = new mongoose_1.Schema({
    item: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'item'
    },
    quantity: Number,
    type: String,
    note: String,
    office: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'office'
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
//# sourceMappingURL=stock.schema.js.map