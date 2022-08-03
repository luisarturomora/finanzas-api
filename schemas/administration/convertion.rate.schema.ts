import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums';
import { CurrencySchema } from './currency.schema';

export const ConvertionRateSchema = new Schema({
    date: Date,
    currency_from: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.currency
    },
    rates: [CurrencySchema],
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