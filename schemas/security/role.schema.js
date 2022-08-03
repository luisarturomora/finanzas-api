"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var module_schema_1 = require("./module.schema");
var widget_schema_1 = require("./widget.schema");
exports.RoleSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    actived: Boolean,
    modules: [module_schema_1.ModuleSchema],
    widgets: [widget_schema_1.WidgetSchema],
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
//# sourceMappingURL=role.schema.js.map