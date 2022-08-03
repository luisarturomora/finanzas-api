import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const ProviderTypeSchema = new Schema({
    name:String,
    description:{
        type: String,
        required: false
    },
    fields: [{
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.field
    }],
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