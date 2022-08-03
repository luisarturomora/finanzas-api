import { Request, Response, Express, Router } from 'express'
import { BaseRoute } from '../base.router'
import { InvoiceRecurrencyController } from '../../controllers/administration/invoice.recurrency.controller'

export class InvoiceRecurrencyRoute extends BaseRoute{
    controller: InvoiceRecurrencyController;
    constructor(app:Express){
        let invoiceRecurrencyController = new InvoiceRecurrencyController(),
            route = Router();
        super(app, invoiceRecurrencyController )
        this.controller = invoiceRecurrencyController;

        route.post( `/api/v1/${this.controller.document_name}/:_id/payment`, (req: Request, res:Response) =>{
            this.controller['payment'](req, res)
        })
        
        route.post( `/api/v1/${this.controller.document_name}/contract/print`, (req: Request, res:Response) =>{
            this.controller.contractPrint(req, res)
        })

        route.get( `/api/v1/${this.controller.document_name}/:_id/suspend`, (req: Request, res:Response) =>{
            this.controller.suspend(req, res)
        })
        
        app.use(route)
    }
}