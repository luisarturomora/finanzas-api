import { Response, Request} from 'express'
import { InvoiceRecurrencyModel } from '../../models/administration/invoice.recurrency.model'
import { BaseController } from '../base.controller'
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export class InvoiceRecurrencyController extends BaseController{
    model: InvoiceRecurrencyModel;
    constructor(){
        let model = new InvoiceRecurrencyModel();
        super(model)
        this.model = model;
        this.document_name = COLLECTION_NAME_ENUM.invoice_recurrency
    }

    async contractPrint(req: Request, res:Response){
        try{
            let loan:any = req.body,
                template = await this.model.contractPrint(loan)
            res.json({
                result: true,
                template: template
            })
        }catch( error){
            console.log(error);
            res.json({
                result: false,
                message: error
            })
        }
    }
    
    async payment(req: Request, res:Response){
        try{
            let payment:any = req.body || {},
                _id: string = req.params._id;
                
            payment.create_user = {
                user_name: req['user'].name,
                account: req['user'].account,
            };
            payment.setting = req['user'].setting;
            payment.create_date = new Date();      
            payment.update_date = new Date();

            let p = await this.model.payment( _id, payment);
            res.json({
                result: true,
                payment: p,
                message: 'Pago agregado correctamete.'
            })
        }catch(error){
            res.json({
                result: false,
                message: 'Error agregando pago.'
            })
        }
    }
    
    async suspend(req: Request, res:Response){
        try{
            let _id: string = req.params._id;
            let message = await this.model.suspend( _id);
            res.json({
                result: true,
                message: message
            })
        }catch(error){
            res.json({
                result: false,
                message: 'Error suspendiendo pago.'
            })
        }
    }
}