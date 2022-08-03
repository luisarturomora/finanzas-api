import { Schema } from 'mongoose'

export const ItemTypeSchema = new Schema({
    name:String,
    code:String,
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'item_type',
        required: false
    },
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