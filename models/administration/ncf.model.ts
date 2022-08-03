import { NcfSchema } from '../../schemas/administration/ncf.schema'
import { BaseModel } from '../base.model' 
import { INcf } from '../../interfaces/administration/ncf.interface';
import { NCF_STATUS_ENUM } from '../../utils/enums';
import { mongo } from 'mongoose';

export class NcfModel extends BaseModel{
    constructor( ){
        super(NcfSchema, 'ncf')
    }

    async save( ncf: INcf){
        try{
            let numbers: Array<number> = [];
            for (let number = ncf['sequencial_from']; number <= ncf['sequencial_to']; number++) {
                numbers.push(number)
            }

            let docs = await this.filter( {
                    type: new mongo.ObjectId( ncf.type._id ),
                    sequential: {
                        '$in': numbers
                    }
                }, { _id: 1}, null, 0, 1);
            if(docs.length <= 0)
                await this.save_as_chunck(numbers, ncf);
            else
                throw new Error(`Existen secuenciales repedito en el rango ${ncf['sequencial_from']} a ${ncf['sequencial_to']}`)
        }catch(error){
            console.log(error)
            throw new Error(error)
        }
    }
    
    async save_as_chunck(numbers: Array<number>, ncfConfig: any) {
        let chunck:Array<number> = [];
        if(numbers.length > 200){
            chunck = numbers.splice( 0, 200);
        }else{
            chunck = numbers.splice( 0, numbers.length);
        }    
        let ncfs: Array<INcf> = [];
        for( let c = 0; c < chunck.length; c++){
            let number = chunck[c],
                ncf: INcf = <INcf>{};
            ncf.type = ncfConfig.type;
            ncf.sequential = number;
            ncf.serie = ncfConfig.serie;
            ncf.status = NCF_STATUS_ENUM.active;
            ncf.end_date = ncfConfig.end_date;
            ncf.setting = ncfConfig.setting;
            ncf.create_date = new Date();
            ncf.create_user = ncf.create_user;
            ncfs.push(ncf);
        }

        await new Promise( ( resolve:any, reject:any) =>{
            this.saveMeny(ncfs).then( async() =>{
                if(numbers.length > 0){
                    await this.save_as_chunck(numbers, ncfConfig);
                }else{
                    resolve(`Secuencia ${ncfConfig['sequencial_from']} hasta ${ncfConfig['sequencial_to']} de ncf registrada correctamente.`)
                }
                resolve()
            }).catch( (error:any) =>{
                reject("Error guardando ncf")
            })
        }) 
    }
}