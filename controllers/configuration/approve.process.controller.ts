import { BaseController } from '../base.controller';
import { Response, Request } from 'express';
import { COLLECTION_NAME_ENUM } from '../../utils/enums';
import { ApproveProcessModel } from '../../models/configuration/approve.process.model';

export class ApproveProcessController extends BaseController{
    model: ApproveProcessModel;
    constructor(){
        let model = new ApproveProcessModel();
        super(model)
        this.model = model;
        this.document_name = COLLECTION_NAME_ENUM.approve_process
    }
    
    async reject(req: Request, res: Response) {
        try {
            let proccess: any = req.body;
            await this.model.reject(proccess);

            res.json({
                message: 'Proceso de aprobación recazado',
                result: true
            });
        } catch (e) {
            res.json({
                result: false,
                message: e.message
            });
        }
    }
    
    async approve(req: Request, res: Response) {
        try {
            let proccess: any = req.body;
            await this.model.approve(proccess);

            res.json({
                message: 'Proceso de aprobación aprobado',
                result: true
            });
        } catch (e) {
            res.json({
                result: false,
                message: e.message
            });
        }
    }
}