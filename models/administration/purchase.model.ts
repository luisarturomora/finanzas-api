import { PurchaseSchema } from '../../schemas/administration/purchase.schema';
import { ItemSchema } from '../../schemas/administration/item.schema';
import { StockSchema } from '../../schemas/administration/stock.schema';
import { BaseModel } from '../base.model';
import { PaymentSchema } from '../../schemas/administration/payment.schema';
import { IPurchase } from '../../interfaces/administration/purchase.interface';
import { IPayment } from '../../interfaces/administration/payment.interface';
import { COLLECTION_NAME_ENUM, PURCHASE_ORDER_STATUS_ENUM } from '../../utils/enums';
import { Utils } from '../../utils/utils';
import { StockModel } from './stock.model';
import { AccountEntryModel } from './account.entry.model';
import { ITax } from '../../interfaces/configuration/tax.interface';
import { PurchaseOrderSchema } from '../../schemas/administration/purchase.order.schema';

export class PurchaseModel extends BaseModel{
    constructor( ){
        super(PurchaseSchema, COLLECTION_NAME_ENUM.purchase)
    }
    
    async save(purchase: IPurchase){
        try{
            let stockModel = new StockModel(),
                accountEntryModel = new AccountEntryModel(),
                purchaseOrderModel = new BaseModel( PurchaseOrderSchema, COLLECTION_NAME_ENUM.quotation);

            purchase.code = await Utils.generate_code('CP', purchase.setting, this);
            purchase.ncf = await Utils.get_next_ncf(purchase.ncf_type, purchase.setting);
            let _purchase = await super.save(purchase);
            purchase._id = _purchase._id;

            await stockModel.in_stock(purchase, 'Compra de productos o servicios');
            await accountEntryModel.purchase_entry(purchase);
            if(!!purchase.purchase_order){
                await purchaseOrderModel.model.updateOne({ _id: purchase.purchase_order }, {
                    $set: { status: PURCHASE_ORDER_STATUS_ENUM.invoiced }
                });
            }
            for(let i:number = 0; i < purchase.items.length; i++){
                let item = purchase.items[i];
                await accountEntryModel.item_entry(item, purchase);
                for( let it: number = 0; it < item.taxes.length; it++){
                    let tax: ITax = item.taxes[it];
                    await accountEntryModel.tax_entry(tax, item.sub_total, purchase)
                }
            }
            return _purchase;
        }catch(error){
            console.log(error)
            throw new Error(`Error guardando ${this.document_name}`)
        }
    }

    async return_purchase(purchase: IPurchase, user:any){
        try{
            let productModel = new BaseModel(ItemSchema, COLLECTION_NAME_ENUM.item),
                stockModel = new BaseModel(StockSchema, COLLECTION_NAME_ENUM.stock),
                paymentModel = new BaseModel(PaymentSchema, 'payment');
            let stocks = purchase.items.map( (item:any) =>{
                return{
                    item: item,
                    quantity: item.quantity,
                    type: 'out',
                    office: purchase.office,
                    note: 'Consepto devolucion de compra.',
                    create_date: new Date(),
                    create_user: user,
                    settings: purchase.setting
                };
            })
            await purchase.items.map( async (item:any) =>{
                let p = await productModel.get(item._id);
                await productModel.update(item._id, {stock: (p.stock + item.quantity)})
            });
            let payments = await paymentModel.filter( {
                    'purchases._id': purchase._id
                }, {
                    _id: true
                }),
                payment_ids = payments.map( (payment:IPayment) =>{
                    return payment._id;
                })
            await paymentModel.model.update({_id: { $in: payment_ids}}, { $set: { status: 'Canceled'}}, { multi: true});
            await stockModel.saveMeny(stocks);
            return await super.update(purchase._id, {status: purchase.status});
        }catch(error){
            console.log(error)
            throw new Error(`Error guardando ${this.document_name}`)
        }
    }
    
    async pending( params:any ){
        try{
            let data:any = {restant: 0, total: 0, purchases: []};
            let purchases = await super.aggregate(params, null, null, [{
                from: "payments",
                localField: "_id", 
                foreignField: "purchases._id",
                as: "payments"
            }]);
            purchases.forEach( (purchase: IPurchase) =>{
                purchase['restant'] = 0
                purchase = purchase; //PurchaseService.get_total(purchase);
                purchase['restant'] = purchase['total_value'];
                purchase['payments'].forEach( (payment:any) =>{
                    purchase['restant'] -= payment.value.valueOf();
                })
                
                if(purchase['restant'] > 0){
                    data.restant += purchase['restant'];
                    data.total += purchase['total_value'];
                    data.purchases.push({
                        _id: purchase._id,
                        restant: purchase['restant'],
                        total:  purchase['total_value'],
                        payment_type: purchase.payment_type,
                        code:  purchase.code,
                        date: purchase.date,
                        provider: {
                            _id: purchase.provider._id,
                            name: purchase.provider.name,
                            last_name: purchase.provider.last_name
                        }
                    });
                }
            })
            return data;
        }catch(error){
            console.log(error)
            throw new Error(`Error cargando cuentas por pagar.`)
        }
    }
    
    async change_status(_id:string, puchase: IPurchase){
        try{         
            return await this.model.update( {_id: _id}, { $set: { status: puchase.status } }, {} ); 
        }catch(error){
            console.log(error)
            throw new Error(`Error modificando el estado de ${this.document_name}`)
        }
    }
}