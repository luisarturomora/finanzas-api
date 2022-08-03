import { SettingSchema } from '../../schemas/administration/setting.schema'
import {UserModel} from '../security/user.model'
import { BaseModel } from '../base.model'

export class SettingModel extends BaseModel{    
    constructor( ){
        super(SettingSchema, 'setting', {
            upload_name: 'logo'
        })
    }
    
    async update( _id:string, _setting:any){
        try{
            await new UserModel().model.updateOne( { 'setting': _id}, {setting: _setting} );
            let result = await super.update(_id, _setting);
            return result;
        }catch(error){
            console.log(error)
            throw new Error(`Error actualizando ${this.document_name}.`)
        }
    }
}