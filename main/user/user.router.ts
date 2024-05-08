import { UserController } from './user.controller';
import {Express, Request, Response} from "express";

export class UserRouter {
    private userController: UserController;
    private app: Express;
    constructor(userController: UserController, app: Express) {
        this.userController = userController;
        this.app = app;
    }
    
    public login() {
       this.app.post("/login",this.userController.login);
       this.app.post("/demo", this.userController.demo)
    }
}
