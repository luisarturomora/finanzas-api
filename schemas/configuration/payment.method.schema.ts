import { Schema } from 'mongoose'

export const PaymentMethodSchema = new Schema({
    name:String,
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