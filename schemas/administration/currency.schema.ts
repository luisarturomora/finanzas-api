import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const CurrencySchema = new Schema({
    name: String,
    plural_name: String,
    code: String,
    symbol: String,
    symbol_native: String,

    rounding: Number,
    decimal_digits: Number,
    value: {
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

CurrencySchema.virtual('rate', {
    ref: COLLECTION_NAME_ENUM.convertion_rate,
    localField: '_id',
    foreignField: 'currency_from',
    justOne: true,
    options: { sort: { date: -1 }, limit: 1 } 
});

