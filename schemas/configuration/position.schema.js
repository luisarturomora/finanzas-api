"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.PositionSchema = new mongoose_1.Schema({
    description: String,
    commission: Number,
    items: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'item_commission'
        }],
    salary: Number,
    fields: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'field'
        }],
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
//# sourceMappingURL=position.schema.js.map