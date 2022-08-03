import { Schema } from 'mongoose';

export const EventLogSchema = new Schema({
    action: String,
    module: String,
    object: Object,
    create_date: Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: false
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: 'setting',
        required: false
    }
});
