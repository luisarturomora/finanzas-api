import { Request, Response, Express, Router } from 'express';
import { BaseRoute } from '../base.router';
import { PackageController } from '../../controllers/administration/package.controller';

export class PackageRoute extends BaseRoute{
    controller: PackageController;
    constructor(app:Express){
        let packageController = new PackageController()
        super(app, packageController )
        this.controller = packageController;
        let route = Router();
        route.post( `/api/v1/${this.controller.document_name}/cancel`, (req: Request, res:Response) =>{
            this.controller.cancel(req, res)
        })
        app.use(route)
    }
}