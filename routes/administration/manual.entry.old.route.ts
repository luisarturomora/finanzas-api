import { Request, Response, Express, Router } from 'express';
import { BaseRoute } from '../base.router';
import { ManualEntryOldController } from '../../controllers/administration/manual.entry.old.controller';


export class ManualEntryOldRoute extends BaseRoute{
    controller: ManualEntryOldController;

    constructor(app:Express){
        let manualEntryController = new ManualEntryOldController();
        super(app, manualEntryController );
        this.controller = manualEntryController;
        let route = Router();
        
        route.post( `/api/v1/${this.controller.document_name}/reject`, (req: Request, res:Response) =>{
            this.controller.reject(req, res);
        })

        route.post( `/api/v1/${this.controller.document_name}/approve`, (req: Request, res:Response) =>{
            this.controller.approve(req, res);
        })

        route.post( `/api/v1/${this.controller.document_name}/start_proccess`, (req: Request, res:Response) =>{
            this.controller.start_proccess(req, res);
        })
        app.use(route);
    }
}