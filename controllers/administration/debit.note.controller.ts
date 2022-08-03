import { BaseController } from '../base.controller'
import {COLLECTION_NAME_ENUM } from '../../utils/enums';
import { DebitNoteModel } from '../../models/administration/debit.note.model';

export class DebitNoteController extends BaseController{
    model: DebitNoteModel;
    constructor(){
        let model = new DebitNoteModel();
        super(model)
        this.model = model;
        this.document_name = COLLECTION_NAME_ENUM.debit_note
    }
}