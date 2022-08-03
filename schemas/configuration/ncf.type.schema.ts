import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const NcfTypeSchema = new Schema({
    name:String,
    code:String,
    serie:String,
    type: String,
    create_date: Date,
    document_types: [{
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.document_type
    }],
    create_user: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.user
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.setting
    }
})