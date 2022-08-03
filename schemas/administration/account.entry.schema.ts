import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums';
import { FieldSchema } from '../configuration/field.schema';
import { EntryMessageSchema } from './entry.message.schema'
export const AccountEntrySchema = new Schema({
    note: String,
    origin: String,
    amount: Number,
    date: Date,
    message:  {
        type: EntryMessageSchema,
        required: false
    },
    history: [{
        type: Object,
        required: false
    }],
    invoice: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.invoice,
        required: false
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.payment,
        required: false
    },
    debit_note: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.debit_note,
        required: false
    },
    credit_note: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.credit_note,
        required: false
    },
    purchase: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.purchase,
        required: false
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.item,
        required: false
    },
    tax: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.tax,
        required: false
    },
    payment_deposit: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.payment_deposit,
        required: false
    },
    document_type: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.document_type,
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
    manual_entry: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.manual_entry,
        required: false
    },
    fields: [ FieldSchema ],
    create_date: Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.user
    },
    user: {
        required: false,
        type: String
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.setting
    }
})
