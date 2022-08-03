import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums'
import { FieldSchema } from './field.schema';

export const AccountSchema = new Schema({
    code: String,
    name: String,
    color: String,
    type: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.account_type
    },
    origin: String,
    parent: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.account,
        required: false
    },
    note: String,
    currency: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.currency
    },
    in_out_account: {
        type: Boolean,
        default: false
    },
    office: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.office,
        required: false
    },
    workflow: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.workflow,
        required: false
    },
    balance: Number,
    init_balance: Number,
    status: String,
    fields: [FieldSchema],
    create_date: Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.user
    },
    setting: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.setting
    },
    account_statement: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.account_statements,
        required: false
    }
}, { toJSON: { virtuals: true } });

AccountSchema.virtual('accounts', {
    ref: COLLECTION_NAME_ENUM.account,
    localField: '_id',
    foreignField: 'parent'
});

AccountSchema.virtual('account_entries', {
    ref: COLLECTION_NAME_ENUM.account_entry,
    localField: '_id',
    foreignField: 'account'
});