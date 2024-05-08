import { FileRouter } from './file.router';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { Express } from 'express';
import AuthMiddleware from '../util/middleware/middleware';


export class FileModule {
    
    private fileService: FileService = new FileService();
    private fileController:FileController = new FileController(this.fileService);
    private fileRouter: FileRouter;

    constructor(app: Express) {
        this.fileRouter = new FileRouter(app, this.fileController);
    }

    public startApi() {
        console.log("Api handle upload and download File is start");
        this.fileRouter.uploadFile();
        this.fileRouter.donwloadFile();
    }
}