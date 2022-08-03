import { Schema } from 'mongoose'
import { FieldSchema } from '../configuration/field.schema';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const ItemSchema = new Schema({
    name:String,
    note: {
        type: String,
        default: ''
    },
    code: String,
    value:Number,
    item_type: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.item_type
    },
    taxes: [{
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.tax
    }],
    service: {
        type: Boolean,
        default: false
    },
    itbis: Number,
    process: [{
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.item_process
    }],
    discount_type: {
        type: String,
        required: false
    },
    discount: {
        type: Number,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    fields: [ FieldSchema ],
    create_date: Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.user
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.setting
    }
}, { toJSON: { virtuals: true } } );

ItemSchema.virtual('configs', {
    ref: COLLECTION_NAME_ENUM.package_config,
    localField: '_id',
    foreignField: 'item'
})