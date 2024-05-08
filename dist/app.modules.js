"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const user_module_1 = require("./user/user.module");
const file_module_1 = require("./file/file.module");
class AppModule {
    constructor(app) {
        new user_module_1.UserModule(app).startApi();
        new file_module_1.FileModule(app).startApi();
    }
}
exports.AppModule = AppModule;
