import { StockModel } from '../../models/administration/stock.model'
import { BaseController } from '../base.controller'
import { Response, Request} from 'express'
import { COLLECTION_NAME_ENUM } from '../../utils/enums';
import { mongo } from 'mongoose';

export class StockController extends BaseController{
    constructor(){
        let model = new StockModel();
        super(model)
        this.document_name = COLLECTION_NAME_ENUM.stock
    }

    public async transfer( req: Request, res:Response){
        try{
            let object:any = req.body
            delete object['_id']
            object.create_user = new mongo.ObjectId(req['user']._id)
            object.setting = new mongo.ObjectId( req['user'].setting);
            object.create_date = new Date();      
            object.update_date = new Date()
            await this.model['transfer'](object);
            res.json({
                result: true,
                message: 'Producto transferido correctamente.'
            })
            this.eventLog(req, 'Transferencia de Productos')
        }catch(error){
            res.json( {
                result: false,
                message: error
            })
        }
    }
    
}