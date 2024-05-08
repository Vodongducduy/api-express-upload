"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const user_controller_1 = require("./user.controller");
const user_router_1 = require("./user.router");
const user_service_1 = require("./user.service");
class UserModule {
    constructor(app) {
        this.userService = new user_service_1.UserService();
        this.userController = new user_controller_1.UserController(this.userService);
        this.userRouter = new user_router_1.UserRouter(this.userController, app);
    }
    startApi() {
        console.log("Api User is start");
        this.userRouter.login();
    }
}
exports.UserModule = UserModule;
