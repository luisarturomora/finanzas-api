import { Schema } from 'mongoose';

export const AcknowledgmentSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'client'
    },
    date:Date,
    number:Number,
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'item'
    }],
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'employee'
    }],
    office: {
        type: Schema.Types.ObjectId,
        ref: 'office'
    },
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