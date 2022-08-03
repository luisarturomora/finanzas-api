import { BaseController } from '../base.controller';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';
import { CreditNoteModel } from '../../models/administration/credit.note.model';

export class CrebitNoteController extends BaseController{
    model: CreditNoteModel;
    constructor(){
        let model = new CreditNoteModel();
        super(model)
        this.model = model;
        this.document_name = COLLECTION_NAME_ENUM.credit_note
    }
}