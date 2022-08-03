import { Schema } from 'mongoose'

export const StockSchema = new Schema({
    item:{
        type: Schema.Types.ObjectId,
        ref: 'item'
    },
    quantity:Number,
    type: String,
    note: String,
    office: {
        type: Schema.Types.ObjectId,
        ref: 'office'
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