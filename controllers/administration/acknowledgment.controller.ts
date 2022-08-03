import { Response, Request} from 'express'
import { AcknowledgmentModel } from '../../models/administration/acknowledgment.model'
import { BaseController } from '../base.controller'
import { EVENT_LOG_ENUM } from '../../utils/enums';

export class AcknowledgmentController extends BaseController{
    model: AcknowledgmentModel;
    constructor(){
        let model = new AcknowledgmentModel();
        super(model)
        this.model = model;
        this.document_name = 'acknowledgment'
    }
    async cancel(req: Request, res:Response){
        try{
            let acknowledgment:any = req.body,
                user:any = req['user'],
                i = await this.model.cancel(acknowledgment, user);
            res.json({
                result: true,
                acknowledgment: i
            })
            
            this.eventLog(req, EVENT_LOG_ENUM.cancel)
        }catch( error ){
            console.log(error);
            res.json({
                result: false,
                message: 'Error en cancelando acuse.'
            })
        }
    }
}