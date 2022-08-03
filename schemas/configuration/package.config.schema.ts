import { Schema } from 'mongoose';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const PackageConfigSchema = new Schema({
    code: String,
    description: String,
    item: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.item
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.item
    }],
    office: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.office
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
})