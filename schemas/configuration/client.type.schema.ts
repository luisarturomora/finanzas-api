import { Schema } from 'mongoose'

export const ClientTypeSchema = new Schema({
    name:String,
    code:String,
    description:{
        type: String,
        required: false
    },
    fields: [{
        type: Schema.Types.ObjectId,
        ref: 'field'
    }],
    create_user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: 'setting'
    }
})