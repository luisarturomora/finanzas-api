"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.EquationSchema = new mongoose_1.Schema({
    variables: [],
    from_parent: {
        type: Boolean,
        required: false
    },
    text: String
});
exports.OptionSchema = new mongoose_1.Schema({
    label: String,
    value: String,
    parent_value: {
        type: String,
        required: false
    }
});
exports.FieldSchema = new mongoose_1.Schema({
    text: String,
    instruction: {
        type: String,
        required: false
    },
    order: Number,
    file_type: {
        type: String,
        required: false
    },
    parent_field_id: {
        type: String,
        required: false
    },
    parent_field_value: {
        type: String,
        required: false
    },
    type: String,
    is_calculate: {
        type: Boolean,
        default: false
    },
    multiple_instance: {
        type: Boolean,
        default: false
    },
    fields: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'field'
        }],
    options: {
        type: [exports.OptionSchema],
        required: false
    },
    value: {
        type: Object,
        required: false
    },
    instances: {
        type: [],
        required: false
    },
    values: {
        type: Object,
        required: false
    },
    equation: {
        type: exports.EquationSchema,
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
//# sourceMappingURL=field.schema.js.map