"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModule = void 0;
const file_router_1 = require("./file.router");
const file_controller_1 = require("./file.controller");
const file_service_1 = require("./file.service");
class FileModule {
    constructor(app) {
        this.fileService = new file_service_1.FileService();
        this.fileController = new file_controller_1.FileController(this.fileService);
        this.fileRouter = new file_router_1.FileRouter(app, this.fileController);
    }
    startApi() {
        console.log("Api handle upload and download File is start");
        this.fileRouter.uploadFile();
        this.fileRouter.donwloadFile();
        this.fileRouter.uploadFileDataSQl();
        this.fileRouter.downloadFileAnalyzeSQL();
    }
}
exports.FileModule = FileModule;
