import { UserController } from './user.controller';
import { UserRouter } from './user.router';
import { UserService } from './user.service';
import express ,{Express} from "express";


export class UserModule{
   private userService: UserService = new UserService();
   private userController: UserController = new UserController(this.userService);
   private userRouter: UserRouter;

   constructor(app: Express) {
    this.userRouter = new UserRouter(this.userController, app);
   }
   
   public startApi() {
    console.log("Api User is start");
    this.userRouter.login();
   }
}

