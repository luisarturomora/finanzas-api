import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const QuotationSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.client
    },
    date: Date,
    currency: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.currency
    },
    code: String,
    items: [Object],
    office: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.office
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.invoice_type
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.account
    },
    status: String,
    note: {
        type: String,
        required: false
    },
    create_date: Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.user
    },
    setting: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.setting
    }
}, { toJSON: { virtuals: true } });

QuotationSchema.virtual('invoice', {
    ref: 'invoice', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'quotation',
    justOne: true
});
