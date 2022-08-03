"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.NcfSchema = new mongoose_1.Schema({
    type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ncf_type'
    },
    sequential: Number,
    serie: String,
    status: String,
    end_date: {
        type: Date,
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
//# sourceMappingURL=ncf.schema.js.map