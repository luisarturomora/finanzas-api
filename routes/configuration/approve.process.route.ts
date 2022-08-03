import { Request, Response, Express, Router } from 'express';
import { BaseRoute } from '../base.router';
import { ApproveProcessController } from '../../controllers/configuration/approve.process.controller';


export class ApproveProcessRoute extends BaseRoute{
    controller: ApproveProcessController;

    constructor(app:Express){
        let approveProcessController = new ApproveProcessController();
        super(app, approveProcessController );
        this.controller = approveProcessController;
        let route = Router();
        route.post( `/api/v1/${this.controller.document_name}/reject`, (req: Request, res:Response) =>{
            this.controller.reject(req, res);
        });
        route.post( `/api/v1/${this.controller.document_name}/approve`, (req: Request, res:Response) =>{
            this.controller.approve(req, res);
        });
        
        app.use(route);
    }
}