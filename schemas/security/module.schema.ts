import { Schema } from 'mongoose';
export const ModuleSchema = new Schema({
    name:String,
    url:String,
    section:String,
    add:{
        type: Boolean,
        default: false
    },
    edit:{
        type: Boolean,
        default: false
    },
    delete:{
        type: Boolean,
        default: false
    },
    print:{
        type: Boolean,
        default: false
    },
    buttons: {
        type: Object,
        required: false
    },
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