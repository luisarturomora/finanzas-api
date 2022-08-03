import { Response, Request } from 'express';
import { SettingModel } from '../../models/administration/setting.model';
import { BaseController } from '../base.controller';
import { Config } from '../../utils/utils';

export class SettingController extends BaseController {
    constructor() {
        let model = new SettingModel();
        super(model);
        this.document_name = 'setting';
    }
    async current(req: Request, res: Response) {
        try {
            let config = Config(),
                is_saas = config['is_saas'];
            if (!is_saas) {
                let settings: Array<any> = await this.model.filter({}, null, null, 0, 1);
                if (settings.length > 0) {
                    settings[0].is_saas = is_saas;
                    res.json({
                        result: true,
                        setting: settings[0]
                    });
                } else {
                    res.json({
                        result: true,
                        setting: {
                            name: 'FINANZAS',
                            logo: 'assets/images/logo-icon.png',
                            background: 'assets/images/background/login-register.png',
                            email: 'revolutionbi@gmail.com',
                            "primary_text_color" : "#ffffff",
                            "primary_background_color" : "#0080ff",
                            "text_color" : "#000000",
                            "background_color" : "#ffffff",
                            is_saas: is_saas
                        }
                    });
                }
            } else {
                if (req['user']) {
                    let user = req['user'];
                    let setting = await this.model.get(user.setting);
                    res.json({
                        result: true,
                        setting: setting
                    });
                } else {
                    res.json({
                        result: true,
                        setting: {
                            name: 'FINANZAS',
                            logo: 'assets/images/logo-icon.png',
                            background: 'assets/images/background/login-register.png',
                            email: 'plistats@gmail.com',
                            "primary_text_color" : "#ffffff",
                            "primary_background_color" : "#0080ff",
                            "text_color" : "#000000",
                            "background_color" : "#ffffff",
                            is_saas: is_saas
                        }
                    });
                }
            }
        } catch (error) {
            console.log(error);
            return {
                result: false,
                message: 'Error buscando configuración por defecto.'
            };
        }
    }

}