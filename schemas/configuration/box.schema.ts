import { Schema } from 'mongoose'

export const BoxSchema = new Schema({
    name: String,
    office: {
        type: Schema.Types.ObjectId,
        ref: 'office'
    },
    status: String,
    create_date: Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: 'setting'
    }
})