import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums';
import { ItemSchema } from './item.schema';
import { FieldSchema } from '../configuration/field.schema';

export const InvoiceRecurrencySchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.client
    },
    office: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.office
    },
    number: Number,
    start_date: Date,
    end_date: Date,
    recurrency: {
        type: Boolean,
        default: false
    },
    frequency: {
        type: Number,
        required: false
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.invoice_type,
        required: false,
    },
    ncf_type: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.ncf_type
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.account
    },
    fields: [ FieldSchema ],
    currency: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.currency
    },
    items: [ ItemSchema ],
    status: String,
    note: {
        type: String,
        required:false
    },
    invoices: [ {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.invoice
    } ],

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
