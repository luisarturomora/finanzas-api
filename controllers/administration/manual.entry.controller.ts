import { BaseController } from '../base.controller'
import { COLLECTION_NAME_ENUM, EVENT_LOG_ENUM } from '../../utils/enums';
import { ManualEntryModel } from '../../models/administration/manual.entry.model';
import { mongo } from 'mongoose';

export class ManualEntryController extends BaseController{
    model: ManualEntryModel;
    constructor(){
        let model = new ManualEntryModel();
        super(model)
        this.model = model;
        this.document_name = COLLECTION_NAME_ENUM.manual_entry
    } 
    
    async start_proccess( req: any, res:any){
        try{
            let manual_entry:any = req.body;
            manual_entry.update_date = new Date();
            let doc = await this.model.start_process(manual_entry);
            res.json({
                result: true,
                doc: doc,
                message: `Se inicio el proceso de aprobación de ${this.document_name}.`
            });
            this.eventLog(req, EVENT_LOG_ENUM.approved);
        }catch(error){
            res.json( {
                result: false,
                error: error.message,
                message: `Error iniciando proceso de aprobacion de ${this.document_name}`
            });
        }
    }

    async approve( req: any, res:any){
        try{
            let object:any = req.body;
            let doc = await this.model.approve(object);
            res.json({
                result: true,
                doc: doc,
                message: `${this.document_name} aprobado correctamente.`
            });
            this.eventLog(req, EVENT_LOG_ENUM.approved);
        }catch(error){
            res.json( {
                result: false,
                error: error.message,
                message: `Error aprobando ${this.document_name}`
            });
        }
    }
    
    async reject( req: any, res:any){
        try{
            let object:any = req.body;
            let doc = await this.model.reject(object);
            res.json({
                result: true,
                doc: doc,
                message: `${this.document_name} rechazado correctamente.`
            });
            this.eventLog(req, EVENT_LOG_ENUM.rejected);
        }catch(error){
            res.json( {
                result: false,
                error: error.message,
                message: `Error aprobando ${this.document_name}`
            });
        }
    }
}