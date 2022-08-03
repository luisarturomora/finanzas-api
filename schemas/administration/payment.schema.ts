import { Schema } from 'mongoose';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';
import { FieldSchema } from '../configuration/field.schema';
import { ConvertionRateSchema } from './convertion.rate.schema';

export const PaymentSchema = new Schema({
    value: Number,
    client: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.client,
        required: false
    },
    code: String,
    provider: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.provider,
        required: false
    },
    date: Date,
    method: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.payment_method
    },
    fields: [ FieldSchema ],
    invoices: [{
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.invoice
    }],
    purchases: [{
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.purchase
    }],
    taxes: [{
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.tax
    }],
    note: String,
    create_date: Date,
    box: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.active_box,
        required: false
    },
    status: String,
    itbis: {
        type: Number,
        required: false
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.account
    },
    currency: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.currency
    },
    convertion_rate: ConvertionRateSchema,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.user
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.setting
    }
})