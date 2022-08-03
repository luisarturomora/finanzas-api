import { Schema } from 'mongoose'
export const NcfSchema = new Schema({
    type: {
        type: Schema.Types.ObjectId,
        ref: 'ncf_type'
    },
    sequential:Number,
    serie:String,
    status: String,
    end_date:{
        type: Date,
        required: false
    },
    create_date:Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: 'setting'
    }
})