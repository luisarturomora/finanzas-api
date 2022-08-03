import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const ApproveProcessSchema = new Schema({
    number: Number,
    workflow: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.workflow
    },
    workflow_process: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.workflow_process
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.user
    },
    manual_entry: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.manual_entry,
        required: false
    },
    approved: {
        type: Boolean,
        required: false   
    },
    note:  {
        type: String,
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
})