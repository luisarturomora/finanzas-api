import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums'
import { ItemSchema } from '../administration/item.schema'
import { InvoiceSchema } from '../administration/invoice.schema';
import { PurchaseSchema } from '../administration/purchase.schema';

export const CreditNoteSchema = new Schema({
    note: String,
    code: String,
    date: Date,
    client: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.client,
        required: false
    },
    provider: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.provider,
        required: false
    },
    invoice: {
        type: InvoiceSchema,
        required: false
    },
    purchase: {
        type: PurchaseSchema,
        required: false
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.debit_note_type,
        required: false
    },
    status: String,
    ncf_type: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.ncf_type
    },
    ncf: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.ncf,
        required: false
    },
    items: [ ItemSchema ],
    currency: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.currency,
        required: false
    },
    office: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.office,
        required: false
    },
    value: Number,

    create_date:Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref:COLLECTION_NAME_ENUM.user
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.setting
    }
})