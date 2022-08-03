import { Schema } from 'mongoose'

export const ActiveBoxSchema = new Schema({
    opening_amount: Number,
    box: {
        type: Schema.Types.ObjectId,
        ref: 'box'
    },
    end_date: {
        type: Date,
        required: false
    },
    totals: {
        type: Object,
        required: false
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