import { Schema } from 'mongoose'
export const NotificationSchema = new Schema({
    icon: String,
    url: String,
    status: String,
    create_date:Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: String
}, {toJSON: {virtuals: true}})