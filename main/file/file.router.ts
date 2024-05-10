import { FileController } from "./file.controller";
import {Express, Request, Response} from "express";
import path from 'path';
import { UploadMutler } from "../util/mutler/multer";
import AuthMiddleware from "../util/middleware/middleware";

export class FileRouter {
    private fileController: FileController;
    private app: Express;
    constructor(app: Express,fileController: FileController){
        app.use(AuthMiddleware)
        this.fileController = fileController;
        this.app = app;
    }

    public uploadFile() {
        this.app.post("/file/sql_param/upload",AuthMiddleware,UploadMutler.array("files"),this.fileController.uploadFile); 
    }

    public donwloadFile() {
        this.app.get("/file/enis/download", AuthMiddleware, this.fileController.downloadFileEnislog);
    }

    public uploadFileDataSQl() {
        this.app.post("/file/data/upload", AuthMiddleware, UploadMutler.single("file"), this.fileController.uploadDataSQL);
    }

    public downloadFileAnalyzeSQL() {
        this.app.get("/file/analyze_SQL/download", AuthMiddleware, this.fileController.downloadFileAnalyzeSQL);
    }
}