import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums'
import { FieldSchema } from '../configuration/field.schema'

export const OfficeSchema = new Schema({
    name:String,
    code:{
        type: String,
        required: false
    },
    fields: [FieldSchema],
    create_date:Date,
    home: {
        type: Boolean,
        required: false
    },
    school: {
        type: Schema.Types.ObjectId,
        required: false
    },
    create_user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: 'setting'
    }
})