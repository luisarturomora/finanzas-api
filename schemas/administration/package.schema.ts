import { Schema } from 'mongoose'

export const PackageSchema = new Schema({
    quantity: Number,
    config: {
        type: Schema.Types.ObjectId,
        ref: 'package_config'
    },
    date: Date,
    number: Number,
    status: String,
    note:{
        type: String,
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
})