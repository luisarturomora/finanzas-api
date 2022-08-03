import { Schema } from 'mongoose'
import { EmployeeSchema } from './employee.schema';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';
import { FieldSchema } from '../configuration/field.schema';
import { ConvertionRateSchema } from './convertion.rate.schema';

export const InvoiceSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.client
    },
    date:Date,
    expire_date: {
        type: Date,
        required: false
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.account
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.invoice_type
    },
    fields: [ FieldSchema ],
    currency: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.currency
    },
    convertion_rate: ConvertionRateSchema,
    code: String,
    items: [ Object ],
    employees: [ EmployeeSchema ],
    office: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.office
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
    acknowledgments: [{
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.acknowledgment
    }],
    note:{
        type: String,
        required: false
    },
    recurrency: {
        type: Boolean,
        default: false
    },
    quotation: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.quotation,
        required: false
    },
    frequency: {
        type: Number,
        required: false
    },
    recurrency_end: {
        type: Date,
        required: false
    },
    debit_note: {
        type: Number,
        required: false
    },
    create_date: Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.user
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.setting
    }
}, { toJSON: { virtuals: true } });

InvoiceSchema.virtual('payments', {
    ref: 'payment', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'invoices',
    justOne: false
});
