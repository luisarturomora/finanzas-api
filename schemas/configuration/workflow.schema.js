"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var enums_1 = require("../../utils/enums");
exports.WorkflowSchema = new mongoose_1.Schema({
    code: String,
    name: String,
    description: {
        type: String,
        required: false
    },
    fields: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: enums_1.COLLECTION_NAME_ENUM.field
        }],
    create_date: Date,
    create_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.user
    },
    setting: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.setting
    }
});
exports.WorkflowSchema.virtual('process', {
    ref: enums_1.COLLECTION_NAME_ENUM.workflow_process,
    localField: '_id',
    foreignField: 'workflow',
    options: { sort: { order: -1 } }
});
//# sourceMappingURL=workflow.schema.js.map