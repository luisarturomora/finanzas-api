import { Response, Request} from 'express';
import { BaseModel } from '../models/base.model';
import { Schema, mongo } from 'mongoose';
import { EventLogSchema } from '../schemas/security/event.log.schema';
import { EVENT_LOG_ENUM } from '../utils/enums';

export class BaseController{
    public model: BaseModel;
    public document_name:string;

    constructor( model?:BaseModel, document_name?:string, schema?:Schema, config?:any){
        this.document_name = document_name;
        if( model ){
            this.model = model
        } else {
            if(config){
                this.model = new BaseModel(schema, document_name, config);
            } else {
                this.model = new BaseModel(schema, document_name, null);
            }
        }
    }

    async list( req: Request, res:Response){
        try{
            let params:any = {};
            params['setting'] = new mongo.ObjectId( req['user'].setting );
            let docs = await this.model.list(params);
            res.json({
                result: true,
                docs: docs
            });
            this.eventLog(req, EVENT_LOG_ENUM.list);
        }catch(error){
            res.json( {
                result: false,
                error: error.message,
                message: `Error mostrando listado de ${this.document_name}`
            });
        }
    }

    async get( req: Request, res:Response){
        try{
            let _id:string = req.params['_id'],
            doc = await this.model.get(_id);
            res.json({
                result: true,
                doc: doc
            });
            this.eventLog(req, EVENT_LOG_ENUM.details );
        }catch(error){
            res.json({
                result: false,
                error: error.message,
                message: `Error buscando ${this.document_name}`
            });
        }
    }

    async save( req: Request, res:Response){
        try{
            let object:any = req.body;
            delete object['_id'];
            object.create_user = new mongo.ObjectId( req['user']._id);
            object.setting = new mongo.ObjectId( req['user'].setting );
            object.create_date = new Date();      
            object.update_date = new Date();
            let doc = await this.model.save(object);
            res.json({
                result: true,
                doc: doc,
                message: `${this.document_name} guardado correctamente.`
            });
            this.eventLog(req, EVENT_LOG_ENUM.save);
        }catch(error){
            res.json( {
                result: false,
                error: error.message,
                message: `Error guardando ${this.document_name}`
            });
        }
    }
    
    async update( req: Request, res:Response){
        try{
            let _id:string = req.params['_id'],
            object:any = req.body;
            object.update_date = new Date();
            if( !object.setting ){
                object.setting = new mongo.ObjectId( req['user'].setting );
            } else{
                object.setting = new mongo.ObjectId( req['user'].setting );
            }
            let message = await this.model.update(_id, object);
            res.json({
                result: true,
                message: `${this.document_name} actualizado correctamente.`
            });
            this.eventLog(req, EVENT_LOG_ENUM.update);
        }catch(error){
            res.json( {
                result: false,
                error: error.message,
                message: `Error modificando ${this.document_name}`
            })
        }
    }

    async delete( req: Request, res:Response){
        try{
            let _id:string = req.params['_id'],
                message = await this.model.delete(_id);
            res.json({
                result: true,
                message: `${this.document_name} borrado correctamente.`
            });
            this.eventLog(req, EVENT_LOG_ENUM.delete);
        }catch(error){
            res.json( {
                result: false,
                error: error.message,
                message: `Error borrando ${this.document_name}`
            });
        }
    }
    private replaceRegEx(obj:any){
        for( let prop in obj){
            var o = obj[prop];
            if(typeof(o) == 'string' ){
                if(o.length > 3 && o[0] == '/' && o[o.length -1] == '/'){
                    o = o.replace(new RegExp('/', 'g'), '')
                    obj[prop] = new RegExp(o, "gi");
                }
            }
            else if( o._bsontype == 'ObjectID' ){
                obj[prop] = o;
            }else if(typeof(o) == 'object'){
                obj[prop] = this.replaceRegEx(o);
            }
        }
        return obj;
    }
    
    async filter( req: Request, res:Response){
        try{
            req.body.params = this.add_object_id(req.body.params);
            let params:any = this.replaceRegEx(req.body.params) || {},
                fields:any = req.body.fields || {},
                sort = req.body.sort || {},
                limit = req.body.limit || 0,
                skip = req.body.skip;

            params['$or'] = [ {
                setting: new mongo.ObjectId( req['user'].setting )
            },{
                setting: { $exists: false }
            }]

            let docs = await this.model.filter(params, fields, sort, skip, limit);
            res.json({
                result: true,
                docs: docs
            });
            this.eventLog(req, EVENT_LOG_ENUM.filter);
        }catch(error){
            res.json( {
                result: false,
                error: error.message,
                message: `Error filtrando ${this.document_name}`
            });
        }
    }

    async size( req: Request, res:Response){
        try{
            req.body.params = this.add_object_id(req.body.params);
            let params:any = this.replaceRegEx(req.body.params) || {};
            params['$or'] = [ {
                setting: new mongo.ObjectId( req['user'].setting )
            },{
                setting: { $exists: false }
            }]
            
            let size:number = await this.model.size(params);
            res.json({
                result: true,
                size: size
            });
        }catch(error){
            res.json( {
                result: false,
                message: error
            });
        }
    }
    
    public add_object_id(object:any){
        let match = {};
        for(let prop in (object || {})){
            if(object[prop].object_id){
                if(object[prop].values)
                    match[prop] = object[prop].values.map( (value:string) =>{ return new mongo.ObjectId(value )});
                if(object[prop].value)
                    match[prop] = new mongo.ObjectId( object[prop].value )
            }else if(object[prop].date){
                match[prop] = new Date(object[prop].value)
            }else if(typeof(object[prop]) == 'object' && object[prop].length >= 0)
                match[prop] = object[prop];
            else if( typeof(object[prop]) == 'object'){
                match[prop] = this.add_object_id(object[prop]);
            }else{
                match[prop] = object[prop];
            }
        }
        return match;
    }

    async aggregate( req: Request, res:Response){
        try{
            let $match:any = this.add_object_id(req.body.$match),
                disk_usage:any = req.body.disk_usage || false;
            let docs = await this.model.aggregate($match,  req.body.$sort, req.body.$project, req.body.$group, req.body.$lookup, req.body.$unwind, disk_usage)
            res.json({
                result: true,
                docs: docs
            })
            this.eventLog(req, 'Filtrar')
        }catch(error){
            res.json( {
                result: false,
                message: error
            })
        }
    }
    
    async eventLog( req:any, action:string ){
        try{
            let body:any;
            if(req.body){
                try{
                    body = JSON.stringify(req.body).replace(/$/g, '');
                }catch(e){
                    console.log(e);
                }
            }
            let event_log = {
                module: this.document_name,
                action: action,
                object: req.body? body : req.params,
                create_date: new Date(),
                create_user:  req['user']? new mongo.ObjectId( req['user']._id ): undefined,
                setting: req['user']? new mongo.ObjectId( req['user'].setting ): undefined
            };
            let eventLogModel = new BaseModel(EventLogSchema, 'eventLog');
            eventLogModel.save( event_log );
        }catch(error){
            console.log(error);
            throw new Error(`Error guardando log de eventos.`);
        }
    }
}