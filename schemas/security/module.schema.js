"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.ModuleSchema = new mongoose_1.Schema({
    name: String,
    url: String,
    section: String,
    add: {
        type: Boolean,
        default: false
    },
    edit: {
        type: Boolean,
        default: false
    },
    delete: {
        type: Boolean,
        default: false
    },
    print: {
        type: Boolean,
        default: false
    },
    buttons: {
        type: Object,
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
//# sourceMappingURL=module.schema.js.map