import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const AccountTypeSchema = new Schema({
    description: String,
    origin: String,
    category: String,
    parent: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.account_type,
        required: false
    },
    fields: [ {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.field,
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
