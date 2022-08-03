import { Schema, Collection } from 'mongoose'
import { ItemSchema } from './item.schema';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';
import { FieldSchema } from '../configuration/field.schema';
import { ConvertionRateSchema } from './convertion.rate.schema';

export const PurchaseSchema = new Schema({
    provider: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.provider
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
        ref: COLLECTION_NAME_ENUM.purchase_type
    },
    fields: [ FieldSchema ],
    currency: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.currency
    },
    convertion_rate: ConvertionRateSchema,
    code:String,
    items: [ ItemSchema ],
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
    note:{
        type: String,
        required: false
    },
    recurrency: {
        type: Boolean,
        default: false
    },
    frequency: {
        type: Number,
        required: false
    },
    recurrency_end: {
        type: Date,
        required: false
    },
    purchase_order: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.purchase_order,
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

PurchaseSchema.virtual('payments', {
    ref: COLLECTION_NAME_ENUM.payment,
    localField: '_id', 
    foreignField: 'purchases',
    justOne: false
});
