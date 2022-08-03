import { BaseController } from '../base.controller';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';
import { PaymentDepositModel } from '../../models/administration/payment.deposit.model'

export class PaymentDepositController extends BaseController{
    model: PaymentDepositModel;
    constructor(){
        let model = new PaymentDepositModel();
        super(model)
        this.model = model;
        this.document_name = COLLECTION_NAME_ENUM.payment_deposit
    }
    
}