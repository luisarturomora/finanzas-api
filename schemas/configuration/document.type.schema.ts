import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const DocumentTypeSchema = new Schema({
    description:  String,
    entry_origin: String,
    origin: String,
    account_category: String,
    account_category2: String,
    workflow: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.workflow,
        required: false
    },
    create_user: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.user
    },
    create_date: Date,
    setting:  {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.setting
    }
})