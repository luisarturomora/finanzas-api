import { Schema } from 'mongoose'
import { FieldSchema } from '../configuration/field.schema';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export const EmployeeSchema = new Schema({
    name:String,
    last_name:String,
    salary: Number,
    position: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.position
    },
    commission: Number,
    fields: [ FieldSchema ],
    items:[{
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME_ENUM.item_commission
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
})