"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
let apiFile = path_1.default.join(process.cwd(), "dist", "main.js");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Api SPC',
            version: '1.0.0',
            description: 'SPC Module',
        },
    },
    apis: [
        apiFile
    ],
};
const specs = (0, swagger_jsdoc_1.default)(options);
exports.default = specs;
