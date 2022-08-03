import { Schema } from 'mongoose'

export const EquationSchema = new Schema({
    variables: [],
    from_parent: {
        type: Boolean,
        required: false
    },
    text: String
})

export const OptionSchema = new Schema({
    label: String,
    value: String,
    parent_value:{
        type: String,
        required: false
    }
})

export const FieldSchema = new Schema({
    text:String,
    instruction:{
        type: String,
        required: false
    },
    order:Number,
    file_type: {
        type: String,
        required: false
    },
    parent_field_id: {
        type: String,
        required: false
    },
    parent_field_value: {
        type: String,
        required: false
    },
    type:String,
    is_calculate: {
        type: Boolean,
        default: false
    },
    multiple_instance: {
        type: Boolean,
        default: false
    },
    fields:[{
        type: Schema.Types.ObjectId,
        ref: 'field'
    }],
    options:{
        type: [OptionSchema],
        required: false
    },    
    value: {
        type: Object,
        required: false
    }, 
    instances: {
        type: [],
        required: false
    },
    values: {
        type: Object,
        required: false
    },
    equation: {
        type: EquationSchema,
        required: false
    },
    create_date: Date,
    create_user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    setting:  {
        type: Schema.Types.ObjectId,
        ref: 'setting'
    }
})