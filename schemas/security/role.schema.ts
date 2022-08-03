import { Schema } from 'mongoose';
import { ModuleSchema } from './module.schema';
import { WidgetSchema } from './widget.schema';

export const RoleSchema = new Schema({
    name: String,
    description: String,
    actived: Boolean,
    modules: [ ModuleSchema ],
    widgets: [ WidgetSchema ],
    create_date: Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: 'setting'
    }
});