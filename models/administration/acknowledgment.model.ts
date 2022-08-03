import { AcknowledgmentSchema } from '../../schemas/administration/acknowledgment.schema'
import { ItemSchema } from '../../schemas/administration/item.schema'
import { StockSchema } from '../../schemas/administration/stock.schema'
import { IAcknowledgment } from '../../interfaces/administration/acknowledgment.interface'
import { BaseModel } from '../base.model'
import { IItem } from '../../interfaces/administration/item.interface';
import { IStock } from '../../interfaces/administration/stock.interface';
import { COLLECTION_NAME_ENUM, STOCK_TYPE_ENUM } from '../../utils/enums';
import { mongo } from 'mongoose';
import { IUser } from '../../interfaces/security/user.interface';

export class AcknowledgmentModel extends BaseModel{
    constructor( ){
        super(AcknowledgmentSchema, 'acknowledgment')
    }
    
    async cancel(acknowledgment: IAcknowledgment, user:IUser){
        try{
            let productModel = new BaseModel(ItemSchema, COLLECTION_NAME_ENUM.item ),
                stockModel = new BaseModel(StockSchema, COLLECTION_NAME_ENUM.stock );
            let stocks = acknowledgment.items.map( (item:IItem):IStock =>{
                let stock:any = {};
                stock.item = new mongo.ObjectId( item._id );
                stock.quantity = item['quantity'];
                stock.type = STOCK_TYPE_ENUM.in;
                stock.office = acknowledgment.office ;
                stock.note = 'Consepto acuse cancelado.';
                stock.create_date = new Date();
                stock.create_user = new mongo.ObjectId( user._id);
                stock.settings = new mongo.ObjectId( acknowledgment.setting._id );

                return stock;
            })
            await acknowledgment.items.map( async (item:IItem) =>{
                let p = await productModel.get(item._id);
                await productModel.update(item._id, {stock: (p.stock + item['quantity'])})
            });
            await stockModel.saveMeny(stocks);
            return await super.update(acknowledgment._id, { status: acknowledgment.status });
        }catch(error){
            console.log(error)
            throw new Error(`Error guardando ${this.document_name}`)
        }
    }

    async save(acknowledgment: IAcknowledgment){
        try{
            let stockModel = new BaseModel(StockSchema, COLLECTION_NAME_ENUM.stock ),
                acknowledgments = await this.filter({
                    "setting._id": acknowledgment.setting._id
                }, {
                    number: true
                }, {
                    number: -1
                }, 
                0, 1);
            acknowledgment.number = acknowledgments.length > 0? ( acknowledgments[0].number + 1) : 1;
            let stocks = acknowledgment.items.map( (item:IItem):IStock =>{
                let stock:any = {};
                stock.item = new mongo.ObjectId( item._id );
                stock.quantity = item['quantity'];
                stock.type = STOCK_TYPE_ENUM.out;
                stock.office = new mongo.ObjectId(acknowledgment.office._id);
                stock.note = 'Consepto de acuse.';
                stock.create_date = new Date();
                stock.create_user = new mongo.ObjectId( acknowledgment.create_user._id );
                stock.settings = new mongo.ObjectId( acknowledgment.setting._id );

                return stock;
            });
            await stockModel.saveMeny(stocks);
            return await super.save(acknowledgment);
        }catch(error){
            console.log(error)
            throw error;
        }
    }
}