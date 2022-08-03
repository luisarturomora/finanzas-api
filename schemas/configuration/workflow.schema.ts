import { Schema } from 'mongoose'
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const WorkflowSchema = new Schema({
    code:String,
    name:  String,
    description:  {
        type: String,
        required: false
    },
    fields: [{
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.field
    }],
    create_date: Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.user
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.setting
    }
});

WorkflowSchema.virtual('process', {
    ref: COLLECTION_NAME_ENUM.workflow_process,
    localField: '_id',
    foreignField: 'workflow',
    options: { sort: { order: -1 } } 
});