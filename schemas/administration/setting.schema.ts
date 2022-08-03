import { Schema } from 'mongoose';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const SettingSchema = new Schema({
    name: String,
    description: String,
    logo: {
        type: String,
        required: false
    },
    phone: String,
    rnc: String,
    address: String,
    email: {
        type: String,
        required: false
    },
    invoice_message: {
        type: String,
        required: false
    },
    office_fields: [{
        type: Schema.Types.ObjectId,
        ref: 'field'
    }],
    payment_message: {
        type: String,
        required: false
    },
    background: {
        type: String,
        required: false
    },
    change_account: {        
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.account,
        required: false
    },
    currency: {        
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.currency,
        required: false
    }
});
