import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums'
import { FieldSchema } from './field.schema';

export const AccountStatementSchema = new Schema({
    code: String,
    name: String,
    origin: String,
    office: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.office,
        required: false
    },
    create_date: Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.user
    },
    isTitle: Boolean,
    title: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.account_statements
    },
    inBilancio: Boolean,
    codeBilancio: String,
    nameBilancio: String,
    shareWithOther: Boolean,
    shareWith: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.account_statements
    }
}, { toJSON: { virtuals: true } });