import { Request, Response, Express, Router } from 'express';
import { BaseController } from '../controllers/base.controller';
let multer = require('multer');
import { join } from 'path';

export class BaseRoute{
    public controller: BaseController;

    constructor(app:Express, controller:BaseController ){
        this.controller = controller;

        let route = Router();
        route.get( `/api/v1/${this.controller.document_name}`, (req: Request, res:Response) =>{
            this.controller.list(req, res);
        })
        route.get( `/api/v1/${this.controller.document_name}/:_id`, (req: Request, res:Response) =>{
            this.controller.get(req, res);
        })
        route.post( `/api/v1/${this.controller.document_name}`, (req: Request, res:Response) =>{
            this.controller.save(req, res);
        })
        route.put( `/api/v1/${this.controller.document_name}/:_id`, (req: Request, res:Response) =>{
            this.controller.update(req, res);
        })
        route.delete( `/api/v1/${this.controller.document_name}/:_id`, (req: Request, res:Response) =>{
            this.controller.delete(req, res);
        })

        /**
         * Advance services
         */
        route.post( `/api/v1/${this.controller.document_name}/size`, (req: Request, res:Response) =>{
            this.controller.size(req, res);
        })
        route.post( `/api/v1/${this.controller.document_name}/filter`, (req: Request, res:Response) =>{
            this.controller.filter(req, res);
        })
        
        route.post( `/api/v1/${this.controller.document_name}/aggregate`, (req: Request, res:Response) =>{
            this.controller.aggregate(req, res);
        })
        let temp_path = join(process.cwd(), '/files/temps/');
        route.post(`/api/v1/${this.controller.document_name}/upload`, multer({ 
            dest: temp_path
        }).single(this.controller.document_name), (req, res) =>{
            let file = req['file'];
            res.json({
                file: file,
                result: true
            });
        });

        app.use(route);
    }
}