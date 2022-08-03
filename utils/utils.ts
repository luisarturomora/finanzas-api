import * as crypto from 'crypto';
import { FREQUENCY_TYPE_ENUM, COLLECTION_NAME_ENUM, NCF_STATUS_ENUM } from './enums';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { INcfType } from '../interfaces/configuration/ncf.type.interface';
import { ISetting } from '../interfaces/administration/setting.interface';
import { BaseModel } from '../models/base.model';
import { NcfSchema } from '../schemas/administration/ncf.schema';
import { mongo } from 'mongoose';
import { INcf } from '../interfaces/administration/ncf.interface';
import { ICurrency } from '../interfaces/administration/currency.interface';
import { IConvertionRate } from '../interfaces/administration/convertion.rate.interface';

export const Config = function(){
    let env = process.env.NODE_ENV || 'default',
        config_path = join( process.cwd(), 'config', `${env}.json`);
    if(existsSync(config_path)){
        let config = readFileSync(config_path, { encoding: 'utf8'});
        return JSON.parse( config );
    }else{
        throw new Error(`No se encontro la configuración ${env}`);
        process.exit(0);
        return;
    }
}

export class Utils {

    public static algorithm:string = 'aes-256-ctr';
    public static password:string = 'a@193746';

    constructor() {
    }

    static encrypt (text: string) {
        let cipher = crypto.createCipher(Utils.algorithm, Utils.password),
	        crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }

    static decrypt (text: string) {
        let decipher = crypto.createDecipher(Utils.algorithm, Utils.password),
	        dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
    
    public static get_next_date(frequency_type: string, date: Date, frequency: number): Date {
        if (frequency_type != FREQUENCY_TYPE_ENUM.hour ) {
            date.setHours(0); date.setMinutes(0); date.setSeconds(0);
        }
        switch (frequency_type) {
            case FREQUENCY_TYPE_ENUM.hour:
                date.setHours(date.getHours() + frequency);
                break;
            case FREQUENCY_TYPE_ENUM.day:
                date.setDate(date.getDate() + frequency);
                break;
            case FREQUENCY_TYPE_ENUM.week:
                date.setDate(date.getDate() + (7 * frequency));
                break;
            case FREQUENCY_TYPE_ENUM.month:
                date.setMonth(date.getMonth() + frequency);
                break;
            case FREQUENCY_TYPE_ENUM.year:
                date.setFullYear(date.getFullYear() + frequency);
                break;
        }
        return date;
    }
    
    public static async get_next_ncf(ncf_type: INcfType, setting: ISetting) {
        if (!ncf_type) {
            return;
        }
        let ncfModel = new BaseModel(NcfSchema, COLLECTION_NAME_ENUM.ncf),
            ncfs = await ncfModel.filter({
                setting: setting,
                status: NCF_STATUS_ENUM.active,
                type: ncf_type ? new mongo.ObjectId(ncf_type._id) : '',
                $and: [{
                    $or: [
                        { end_date: null },
                        { end_date: { $exists: false } },
                        { end_date: { $gte: new Date() } }
                    ]
                }]
            }, {}, { sequential: 1 }, 0, 1),
            ncf: INcf;

        if (ncf_type && ncfs.length <= 0) {
            throw new Error(`Se agotaron los NCF del tipo ${ncf_type.name}, es necesario agregar una nueva secuencia.`);
        }

        if (ncfs.length > 0) {
            ncf = ncfs[0];
            await ncfModel.update(ncf._id, { status: NCF_STATUS_ENUM.used });
        }

        return ncf;
    }

    public static convertion( rate:IConvertionRate, currency:ICurrency ): number{
        if(!rate)
            return 1;
        let rate_value:number = 1,
            c = rate.rates.filter( (c:ICurrency) =>{
                return c._id == currency.toString() ||  c._id == (currency._id? currency._id.toString() : '');
            });
        if(c.length > 0){
            rate_value = (1 / c[0].value);
        }
        return rate_value;
    }
    
    public static async generate_code(prefix:string, setting: ISetting, model: BaseModel) {
        let year = new Date().getFullYear(),
            start_date = new Date(year, 0, 1, 0, 0, 0, 0),
            end_date = new Date( year, 11, 31, 23, 59, 59, 999),
            number:number = 0,
            docs = await model.filter({
                setting: setting,
                $and: [{
                    create_date: {
                        $gte: start_date
                    }
                }, {
                    create_date: {
                        $lte: end_date
                    }
                }]
            },{
                code: 1
            }, {
                create_date: -1
            }, 0, 1);
        if(docs.length > 0 && docs[0].code){
            let code_split = docs[0].code.split('-');
            number = Number(code_split[2]);
        }
        let code = `${prefix}-${year}-${number + 1}`;
        return code;
    }
}