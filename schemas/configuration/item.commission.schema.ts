import { Schema } from 'mongoose'

export const ItemCommissionSchema = new Schema({
    commission: Number,
    item: {
        type: Schema.Types.ObjectId,
        ref: 'item'
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