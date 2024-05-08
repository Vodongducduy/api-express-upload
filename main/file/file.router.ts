import { FileController } from "./file.controller";
import {Express, Request, Response} from "express";
import multer, { Multer } from 'multer';
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
        this.app.post("/file/upload",AuthMiddleware,UploadMutler.array("files"),this.fileController.uploadFile);
    }

    public donwloadFile() {
        this.app.get("/file/download", AuthMiddleware, this.fileController.downloadFileEnislog);
    }
}