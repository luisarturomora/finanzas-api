"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.ClientTypeSchema = new mongoose_1.Schema({
    name: String,
    code: String,
    description: {
        type: String,
        required: false
    },
    fields: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'field'
        }],
    create_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    setting: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'setting'
    }
});
//# sourceMappingURL=client.type.schema.js.map