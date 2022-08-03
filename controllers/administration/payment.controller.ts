import { BaseController } from '../base.controller';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';
import { PaymentModel } from '../../models/administration/payment.model';

export class PaymentController extends BaseController{
    model: PaymentModel;
    constructor(){
        let model = new PaymentModel();
        super(model)
        this.model = model;
        this.document_name = COLLECTION_NAME_ENUM.payment
    }
    
}