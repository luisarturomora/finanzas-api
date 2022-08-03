import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const InvoiceTypeSchema = new Schema({
    code:String,
    description:  String,
    account: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.account
    },
    fields: [{
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.field
    }],
    document_type: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.document_type
    },
    create_user: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.user
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.setting
    }
})