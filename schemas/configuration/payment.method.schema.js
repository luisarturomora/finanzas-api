"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.PaymentMethodSchema = new mongoose_1.Schema({
    name: String,
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
//# sourceMappingURL=payment.method.schema.js.map