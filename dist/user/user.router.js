"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
class UserRouter {
    constructor(userController, app) {
        this.userController = userController;
        this.app = app;
    }
    login() {
        this.app.post("/login", this.userController.login);
    }
}
exports.UserRouter = UserRouter;
