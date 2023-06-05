"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.NotificationSchema = new mongoose_1.Schema({
    icon: String,
    url: String,
    status: String,
    create_date: Date,
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    createUser: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: String
}, { toJSON: { virtuals: true } });
//# sourceMappingURL=notification.schema.js.map