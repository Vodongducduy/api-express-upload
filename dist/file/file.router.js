"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRouter = void 0;
const multer_1 = require("../util/mutler/multer");
const middleware_1 = __importDefault(require("../util/middleware/middleware"));
class FileRouter {
    constructor(app, fileController) {
        app.use(middleware_1.default);
        this.fileController = fileController;
        this.app = app;
    }
    uploadFile() {
        this.app.post("/file/sql_param/upload", middleware_1.default, multer_1.UploadMutler.array("files"), this.fileController.uploadFile);
    }
    donwloadFile() {
        this.app.get("/file/enis/download", middleware_1.default, this.fileController.downloadFileEnislog);
    }
    uploadFileDataSQl() {
        this.app.post("/file/data/upload", middleware_1.default, multer_1.UploadMutler.single("file"), this.fileController.uploadDataSQL);
    }
    downloadFileAnalyzeSQL() {
        this.app.get("/file/analyze_SQL/download", middleware_1.default, this.fileController.downloadFileAnalyzeSQL);
    }
}
exports.FileRouter = FileRouter;
