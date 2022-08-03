import { Schema } from 'mongoose'

export const PositionSchema = new Schema({
    description:String,
    commission: Number,
    items:[{
        type: Schema.Types.ObjectId,
        ref: 'item_commission'
    }],
    salary: Number,
    fields: [{
        type: Schema.Types.ObjectId,
        ref: 'field'
    }],
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