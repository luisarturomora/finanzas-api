import { Schema } from 'mongoose';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const PaymentRequestSchema = new Schema({
    code: String,
    date: Date,
    purchase: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.purchase
    },
    provider: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.provider
    },
    value: Number,
    note: String,
    create_date: Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.user
    },
    setting: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.setting
    }
})