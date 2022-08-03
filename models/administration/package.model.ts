import { PackageSchema } from '../../schemas/administration/package.schema'
import { StockSchema } from '../../schemas/administration/stock.schema'
import { BaseModel } from '../base.model'
import { mongo } from 'mongoose';
import { STOCK_TYPE_ENUM } from '../../utils/enums';

export class PackageModel extends BaseModel{
    constructor( ){
        super(PackageSchema, 'package')
    }
    
    async cancel(generation: any, user:any){
        try{
            let stockModel = new BaseModel(StockSchema, 'stock');
            let product_stocks = generation.config.products.map( (item:any) =>{
                return{
                    item: item,
                    quantity: item.quantity * generation.quantity.valueOf(),
                    type: 'out',
                    office: generation.config.office,
                    note: generation.note || `Producción ${generation.number} cancelada.` ,
                    create_date: new Date(),
                    create_user: user,
                    settings: generation.config.setting
                };
            })
            let supply_stocks = generation.config.items.map( (item:any) =>{
                return{
                    item: item,
                    quantity: item.quantity * generation.quantity.valueOf(),
                    type: 'in',
                    office: generation.config.office,
                    note: generation.note || `Producción ${generation.number} cancelada.` ,
                    create_date: new Date(),
                    create_user: user,
                    settings: generation.config.setting
                };
            })
            await stockModel.saveMeny(product_stocks);
            await stockModel.saveMeny(supply_stocks);
            return await super.update(generation._id, {status: generation.status});
        }catch(error){
            console.log(error)
            throw new Error(`Error guardando ${this.document_name}`)
        }
    }

    async save(generation: any){
        try{
            let stockModel = new BaseModel(StockSchema, 'stock'),
                generations = await this.filter({"setting": generation.setting}, {number: true}, {number: -1}, 1);
                
                generation.number = generations.length > 0? ( generations[0].number + 1) : 1;
            let item_stock = {
                    item:  generation.config.item,
                    quantity: generation.quantity.valueOf(),
                    type: STOCK_TYPE_ENUM.in,
                    office: generation.config.office,
                    note: generation.note || `Producción ${generation.number} generada.` ,
                    create_date: new Date(),
                    create_user: generation.create_user,
                    settings: generation.setting
                };
            let supply_stocks = generation.config.items.map( (item:any) =>{
                return{
                    item: new mongo.ObjectId( item._id ),
                    quantity: generation.quantity * item.quantity,
                    type: STOCK_TYPE_ENUM.out,
                    office: generation.config.office,
                    note: generation.note || `Producción ${generation.number} generada.` ,
                    create_date: new Date(),
                    create_user: generation.create_user,
                    settings: generation.setting
                };
            });
            await stockModel.saveMeny([item_stock]);
            if(supply_stocks.length > 0){
                await stockModel.saveMeny(supply_stocks);
            }
            return await super.save(generation);
        }catch(error){
            throw new Error(error)
        }
    }
    
}