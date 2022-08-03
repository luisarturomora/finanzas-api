"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.ItemCommissionSchema = new mongoose_1.Schema({
    commission: Number,
    item: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'item'
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
//# sourceMappingURL=item.commission.schema.js.map