"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_modules_1 = require("./app.modules");
const cors_1 = __importDefault(require("cors"));
// Create App Express
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = 3000;
new app_modules_1.AppModule(app);
app.listen(port, function () {
    console.log(`Server is running on https:localhost:${port}`);
});