"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.ItemTypeSchema = new mongoose_1.Schema({
    name: String,
    code: String,
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'item_type',
        required: false
    },
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
//# sourceMappingURL=item.type.schema.js.map