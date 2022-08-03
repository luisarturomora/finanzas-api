import { Schema } from 'mongoose';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const PaymentDepositSchema = new Schema({
    code: String,
    date: Date,
    payments: [{
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.payment
    }],
    account: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.account
    },
    note: String,
    status: String,
    value: Number,
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