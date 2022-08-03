import { BaseController } from '../base.controller';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';
import { AccountEntryModel } from '../../models/administration/account.entry.model';

export class AccountEntryController extends BaseController{
    model: AccountEntryModel;
    constructor(){
        let model = new AccountEntryModel();
        super(model)
        this.model = model;
        this.document_name = COLLECTION_NAME_ENUM.account_entry
    }
}