import { Schema } from 'mongoose'
import { AccountEntrySchema } from './account.entry.schema';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const ManualEntrySchema = new Schema({
    code: String,
    date: Date,
    inout_account: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.account
    },
    entries: [ AccountEntrySchema ],
    note: String,
    currency: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.currency
    },
    document_type: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.document_type
    },
    office: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.office,
        required: false
    },
    year: {
        type: Schema.Types.Number,
        required: false
    },
    month: {
        type: Schema.Types.Number,
        required: false
    },
    workflow: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.workflow,
        required: false
    },
    status: String,
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