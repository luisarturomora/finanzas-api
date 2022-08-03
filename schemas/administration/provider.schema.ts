import { Schema } from 'mongoose'
import { FieldSchema } from '../configuration/field.schema';

export const ProviderSchema = new Schema({
    name:String,
    last_name:String,
    type: {
        type: Schema.Types.ObjectId,
        ref: 'provider_type'
    },
    fields: [ FieldSchema ],
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