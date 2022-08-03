import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const TaxSchema = new Schema({
    name: String,
    value:Number,
    default:{
        type: Boolean,
        default: false
    },
    apply_value: {
        type: Boolean,
        default: false
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.account
    },
    create_date:Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.user
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.setting
    }
})