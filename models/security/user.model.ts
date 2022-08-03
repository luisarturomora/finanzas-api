
import { UserSchema } from '../../schemas/security/user.schema';

import { SettingSchema } from '../../schemas/administration/setting.schema';
import { RoleSchema } from '../../schemas/security/role.schema';
import { Utils } from '../../utils/utils';
import { USER_STATUS_ENUM, COLLECTION_NAME_ENUM } from '../../utils/enums'
import { BaseModel } from '../base.model';
import { IOffice } from '../../interfaces/configuration/office.interface';
import { OfficeSchema } from '../../schemas/administration/office.schema';

export class UserModel extends BaseModel{
    
    constructor( ){
        super(UserSchema, 'user', {
            upload_name: 'image'
        });
    }
    
    async save( _user:any){
        try{
            _user.password = Utils.encrypt(_user.password);
            let settingModel = new BaseModel( SettingSchema, 'setting'),
                users:number = await this.size( {
                    user_name: _user.user_name
                }),
                setting: any = settingModel.get(_user.setting);
            if(users > 0){
                throw new Error(`El usuario ${_user.user_name} ya existe en el sistema.`);
            }
            
            if(setting.max_user){
                let user_quantity = await super.size({'setting': setting._id});
                
                if(user_quantity >= _user.setting.max_user ){
                    throw new Error( `Con el plan actual solo puede crear ${ _user.setting.max_user } usuarios.`);
                }
            }
            let user = await super.save(_user);
            return user
        }catch(error){
            console.log(error);
            return `Error registrando el usuario ${_user.user_name}.`;
        }
    }

    async update(_id:string, _user:any){
        try{
            if( _user.password){
                _user.password = Utils.encrypt(_user.password);
            }
            return await super.update(_id, _user);
        }catch(error){
            console.log(error);
            return `Error actualizando el usuario ${_user.email}`;
        }
    }
    
    async password_change( _user:any ){
        try{
            _user.last_password = Utils.encrypt(_user.last_password);
            let users:Array<any> = await this.filter( {email: _user.email, password: _user.last_password});

            if( users.length == 0){
                throw new Error(`La contraseña actual es incorrecta.`);
            }
            let edit_user = users[0];
            edit_user.password = Utils.encrypt(_user.password);
            await super.update(_user._id, edit_user);
            return {
                result: true,
                message: 'Contraseña modificada correctamente.'
            };
        }catch(error){
            console.log(error);
            throw new Error(`Error actualizando contraseña.`);
        }
    }

    async login( _user:any ){
        try{
            _user.password = Utils.encrypt(_user.password);
            let users = await this.filter( {
                    user_name: _user.user_name,
                    password: _user.password,
                    status: USER_STATUS_ENUM.actived
                },{
                    name: true,
                    user_name: true,
                    last_name: true,
                    roles: 1,
                    setting: 1
                },{},
                0,1
            );
            if( users.length == 0){
                throw new Error( `El usuario o contraseña no es correcta, verifique los datos`);
            }
            let user = users[0];
            return user;
        }catch(error){
            console.log(error);
            throw new Error('A ocurrido un error iniciando sessión.');
        }finally{
            
        }
    }

    async logged(_user:any){
        try{
            let roleModel = new BaseModel(RoleSchema, COLLECTION_NAME_ENUM.role),
                officeModel = new BaseModel(OfficeSchema, COLLECTION_NAME_ENUM.office);
            let user = await this.get(_user._id),
                office_ids = user.offices.map((office:IOffice) =>{ return office._id } ),
                role_ids = user.roles.map((role:any) =>{ return role._id } ),
                offices = await officeModel.filter({
                    _id: { $in: office_ids }
                }, {
                    _id: 1,
                    name: 1,
                    'fields.value': 1,
                    'fields.text': 1
                }),
                roles = await roleModel.filter({
                _id: { $in: role_ids }
            }, {
                _id: 1,
                name: 1,
                modules: 1,
                widgets: 1
            });
            user.roles = roles;
            user.offices = offices;
            return user;
        }catch(error){
            console.log(error);
            throw new Error('A ocurrido un error iniciando sessión.');
        }finally{
            
        }
    }
}