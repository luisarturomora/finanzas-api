import { Schema } from 'mongoose'
import { FieldSchema } from '../configuration/field.schema';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const ClientSchema = new Schema({
    name:String,
    last_name:String,
    type: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.client_type
    },
    fields: [FieldSchema],
    create_date: Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.user
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.setting
    }
})