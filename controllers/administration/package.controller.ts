import { Response, Request} from 'express';
import { PackageModel } from '../../models/administration/package.model';
import { BaseController } from '../base.controller';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';

export class PackageController extends BaseController{
    model: PackageModel;
    constructor(){
        let model = new PackageModel();
        super(model)
        this.model = model;
        this.document_name = COLLECTION_NAME_ENUM.package;
    }
    
    async cancel(req: Request, res:Response){
        try{
            let generation:any = req.body,
                user:any = req['user'],
                g = await this.model.cancel(generation, user);
            res.json({
                result: true,
                generation: g
            })
            
            this.eventLog(req, 'Cancelar generación')
        }catch( error ){
            console.log(error);
            res.json({
                result: false,
                message: 'Error en el proceso de cancelación.'
            })
        }
    }
}