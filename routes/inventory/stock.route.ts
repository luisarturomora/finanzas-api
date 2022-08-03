import { Request, Response, Express, Router } from 'express'
import { BaseRoute } from '../base.router'
import { StockController } from '../../controllers/administration/stock.controller'

export class StockRoute extends BaseRoute{
    controller: StockController;
    constructor(app:Express){
        let stockController = new StockController()
        super(app, stockController )
        this.controller = stockController;
        let route = Router();
        route.post( `/api/v1/${this.controller.document_name}/transfer`, (req: Request, res:Response) =>{
            this.controller.transfer(req, res)
        })
        app.use(route)
    }
}