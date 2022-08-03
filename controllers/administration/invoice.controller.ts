import { Response, Request} from 'express'
import { InvoiceModel } from '../../models/administration/invoice.model'
import { BaseController } from '../base.controller'
import { mongo } from 'mongoose'
import { INVOICE_STATUS_ENUM, PAYMENT_TYPE_ENUN } from '../../utils/enums';

export class InvoiceController extends BaseController{
    model: InvoiceModel;
    constructor(){
        let model = new InvoiceModel();
        super(model)
        this.model = model;
        this.document_name = 'invoice'
    }
    
    async from_acknowledgment(req: Request, res:Response){
        try{
            let ids:any = req.body,
                user:any = req['user'];
            let i = await this.model.from_acknowledgment(ids, user);
            res.json({
                result: true,
                invoice: i
            })
            console.log('Ultima actualizacion pureba')
            this.eventLog(req, 'Factura de acuse')
        }catch( error ){
            console.log(error);
            res.json({
                result: false,
                message: 'Error en el proceso de facturar acuse.'
            })
        }
    }
    
    async pending(req: Request, res:Response){
        try{
            let params:any = super.add_object_id(req.body) || {};
            params['$or'] = [{
                "setting._id": new mongo.ObjectId( req['user'].setting._id)
            },
            {
                "setting": { $exists: false }
            }];

            params.status = INVOICE_STATUS_ENUM.Created;
            params.payment_type = PAYMENT_TYPE_ENUN.credit;
            let data = await this.model.pending(params);
            res.json({
                result: true,
                data: data
            })
            this.eventLog(req, 'Facturas Pendientes')
        }catch( error ){
            console.log(error);
            res.json({
                result: false,
                message: 'Error en el proceso de devolución.'
            })
        }
    }
    
    async change_status(req: Request, res:Response){
        try{
            let invoice:any = req.body,
                _id:string = req.params._id,
                i = await this.model.change_status(_id, invoice);
            res.json({
                result: true,
                message: 'Factura actualizada correctamente'
            })
            
            this.eventLog(req, 'Cambio de estado de factura')
        }catch( error ){
            console.log(error);
            res.json({
                result: false,
                message: 'Error en el proceso de devolución.'
            })
        }
    }
}