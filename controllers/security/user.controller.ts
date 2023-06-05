import { Response, Request } from 'express';
import { UserModel } from '../../models/security/user.model';
import { BaseController } from '../base.controller';
import { EVENT_LOG_ENUM } from '../../utils/enums';
import { Config } from '../../utils/utils';

const jwt = require('jsonwebtoken');

export class UserController extends BaseController {
    private sessionConfig: any;
    model:UserModel;
    constructor() {
        let model = new UserModel(),
            config = Config();
        super(model);
        this.document_name = 'user';
        this.model = model;
        this.sessionConfig = config['sessionConfig'];
    }

    async setting(req: Request, res: Response) {
        try {
            let users: Array<any> = await this.model.filter({ name: req.params.name }, {
                setting: {
                    name: 1,
                    description: 1,
                    background: 1,
                    logo: 1,
                    background_color: 1,
                    text_color: 1,
                    primary_background_color: 1,
                    primary_text_color: 1,
                }
            });
            if (users.length > 0) {
                res.json({
                    result: true,
                    setting: users[0].setting
                })
            } else {
                res.json({
                    result: false,
                    message: 'No se encontro la confiruración.'
                });
            }
        } catch (e) {
            res.json({
                result: false,
                message: 'No se encontro la confiruración.'
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            console.log('login controller');
            let _user: any = req.body,
                user = await this.model.login(_user),
                profile = {
                    user_name: user.user_name,
                    name: `${user.name} ${user.last_name}`,
                    _id: user._id.toString(),
                    setting: user.setting.toString()
                },
                options = Object.assign({}, this.sessionConfig.options);
            var token = jwt.sign(profile, this.sessionConfig.secret, options);

            res.json({
                result: true,
                token
            });

            this.eventLog(req, EVENT_LOG_ENUM.signIn);
        } catch (e) {
            res.json({
                result: false,
                message: e.message
            });
        }
    }
    
    async logged(req: Request, res: Response) {
        try {
            let _user: any = req['user'],
                user = await this.model.logged(_user);

            res.json({
                user: user,
                result: true
            });
        } catch (e) {
            res.json({
                result: false,
                message: e.message
            });
        }
    }

    async logout(req: Request, res: Response) {
        delete req['finanza_user'];
        res.json({
            result: true,
            message: 'Session cerrada correctamente.'
        });
    }

    async password_change(req: Request, res: Response) {
        try {
            let user: any = req.body;
            let result = await this.model.password_change(user);
            await this.eventLog(req, EVENT_LOG_ENUM.passwordChange);
            return res.json(result);
        } catch (e) {
            return res.json({
                result: false,
                message: e.message
            });
        }
    }
}