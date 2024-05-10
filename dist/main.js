"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_modules_1 = require("./app.modules");
const cors_1 = __importDefault(require("cors"));
const swagger_config_1 = __importDefault(require("./util/swagger/swagger.config"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Create App Express
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = 3000;
app.use("/api-spc", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.default));
new app_modules_1.AppModule(app);
app.listen(port, function () {
    console.log(`Server is running on https:localhost:${port}`);
});
