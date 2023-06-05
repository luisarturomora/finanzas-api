import { Request, Response, Express, Router } from 'express';
import { UserController } from '../../controllers/security/user.controller';
import { BaseRoute } from '../base.router';

export class UserRoute extends BaseRoute{
    controller: UserController;

    constructor(app:Express){
        let userController = new UserController();
        super(app, userController );
        this.controller = userController;
        let route = Router();
        
        route.post( '/api/v0/user/login', (req: Request, res:Response) =>{
            console.log('login route');
            this.controller.login(req, res);
        });
        route.post( '/api/v1/user/logged', (req: Request, res:Response) =>{
            this.controller.logged(req, res);
        });
        route.post( '/api/v1/user/logout', (req: Request, res:Response) =>{
            this.controller.logout(req, res);
        });
        route.post( '/api/v1/user/password', (req: Request, res:Response) =>{
            this.controller.password_change(req, res);
        });
        route.get( '/api/v0/user/:name/setting', (req: Request, res:Response) =>{
            this.controller.setting(req, res);
        });
        route.get( '/api/v1/user/session/keepalive', (req: Request, res:Response) =>{
            res.json({
                result: true
            })
        });
        app.use(route);
    }
}