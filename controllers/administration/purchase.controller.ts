import { Response, Request} from 'express'
import { PurchaseModel } from '../../models/administration/purchase.model'
import { BaseController } from '../base.controller'
import { mongo } from 'mongoose';
import { PAYMENT_TYPE_ENUN, PURCHASE_STATUS_ENUM } from '../../utils/enums';

export class PurchaseController extends BaseController{
    model: PurchaseModel;
    constructor(){
        let model = new PurchaseModel();
        super(model)
        this.model = model;
        this.document_name = 'purchase'
    }
    
    async return_purchase(req: Request, res:Response){
        try{
            let purchase:any = req.body,
                user:any = req['user'],
                i = await this.model.return_purchase(purchase, user);
            res.json({
                result: true,
                purchase: i
            })
            
            this.eventLog(req, 'Devolución de compra')
        }catch( error ){
            console.log(error);
            res.json({
                result: false,
                message: 'Error en el proceso de devolución.'
            })
        }
    }

    async pending(req: Request, res:Response){
        try{
            let params:any = req.body || {};
            params['$or'] = [{
                "setting": new mongo.ObjectId( req['user'].setting)
            },
            {
                "setting": { $exists: false }
            }];
            params.status = PURCHASE_STATUS_ENUM.created;
            params.payment_type = PAYMENT_TYPE_ENUN.credit;

            let data = await this.model.pending(params);
            res.json({
                result: true,
                data: data
            })
            this.eventLog(req, 'Compras Pendientes')
        }catch( error ){
            console.log(error);
            res.json({
                result: false,
                message: 'Error cargando las cuentas por pagar.'
            })
        }
    }
    
    
    async change_status(req: Request, res:Response){
        try{
            let purchase:any = req.body,
                _id:string = req.params._id,
                i = await this.model.change_status(_id, purchase);
            res.json({
                result: true,
                message: 'Compra actualizada correctamente'
            })
            
            this.eventLog(req, 'Cambio de estado de compra')
        }catch( error ){
            console.log(error);
            res.json({
                result: false,
                message: 'Error en el proceso de cambio de estado.'
            })
        }
    }
}