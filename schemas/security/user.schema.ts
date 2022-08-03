import { Schema } from 'mongoose';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const UserSchema = new Schema({
    name: String,
    last_name: String,
    password: String,
    user_name: String,
    email: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.role
    }],
    offices: [{
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.office
    }],
    currency: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.currency,
        required: false
    },
    status: String,
    create_date: Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.user,
        required: false
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.setting
    }
});