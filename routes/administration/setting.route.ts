import { Request, Response, Express, Router } from 'express';
import { BaseRoute } from '../base.router';
import { SettingController } from '../../controllers/administration/setting.controller';


export class SettingRoute extends BaseRoute{
    controller: SettingController;

    constructor(app:Express){
        let settingController = new SettingController();
        super(app, settingController );
        this.controller = settingController;
        let route = Router();
        
        route.get( `/api/v1/${this.controller.document_name}/get/current`, (req: Request, res:Response) =>{
            this.controller.current(req, res);
        })
        app.use(route);
    }
}