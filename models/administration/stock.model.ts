import { StockSchema } from '../../schemas/administration/stock.schema';
import { BaseModel } from '../base.model';
import { COLLECTION_NAME_ENUM, STOCK_TYPE_ENUM } from '../../utils/enums';
import { IItem } from '../../interfaces/administration/item.interface';


export class StockModel extends BaseModel {
    constructor() {
        super(StockSchema, 'stock')
    }

    public async transfer(stock: any) {
        try {
            let stockModel = new BaseModel(StockSchema, 'stock');
            let stocks = [{
                item: stock.item,
                quantity: stock.quantity,
                type: 'in',
                office: stock.office,
                note: `Recibido desde la sucursal ${stock['source_office'].name}.`,
                create_date: new Date(),
                create_user: stock.create_user,
                settings: stock['setting']
            }, {
                item: stock.item,
                quantity: stock.quantity,
                type: 'out',
                office: stock['source_office'],
                note: `Tranferido a la sucursal ${stock.office.name}.`,
                create_date: new Date(),
                create_user: stock.create_user,
                settings: stock['setting']
            }];
            return await stockModel.saveMeny(stocks);
        } catch (error) {
            console.log(error)
            throw new Error(`Error en la transferencia ${this.document_name}`)
        }
    }

    public async out_stock(invoice: any, note: string) {
        let stockModel = new BaseModel(StockSchema, COLLECTION_NAME_ENUM.stock),
            items = invoice.items.filter((item: IItem) => {
                return !item.service;
            });
        let stocks = items.map((item: any) => {
            return {
                item: item,
                quantity: item.quantity,
                type: STOCK_TYPE_ENUM.out,
                office: invoice.office,
                note: note,
                create_date: new Date(),
                create_user: invoice.create_user,
                setting: invoice.setting
            };
        });

        if (stocks.length > 0) {
            await stockModel.saveMeny(stocks);
        }
    }

    public async in_stock(object: any, note: string) {
        let stockModel = new BaseModel(StockSchema, COLLECTION_NAME_ENUM.stock),
            items = object.items.filter((item: IItem) =>{
            return !item.service
        });

        let stocks = items.map((item: IItem) => {
            return {
                item: item,
                quantity: item.quantity,
                type: STOCK_TYPE_ENUM.in,
                office: object.office,
                note: note,
                create_date: new Date(),
                create_user: object.create_user,
                setting: object.setting
            };
        });

        if (stocks.length > 0) {
            await stockModel.saveMeny(stocks);
        }
    }
}