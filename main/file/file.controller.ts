import { UserDTO } from "../user/dto/user.dto";
import { UploadMutler } from "../util/mutler/multer";
import { FileService } from "./file.service";
import { Request, Response } from "express";

export class FileController {

    private fileService: FileService;

    constructor(fileService: FileService) {
        this.fileService = fileService;
    }

    public uploadFile = (req: Request, res: Response) => {
        try {
            let enislogPath = this.fileService.uploadFileSQL(req);
            if (enislogPath.length > 0) {
                res.status(200).json({
                    Message: "Download file Enlislog.txt successfully!",
                })
            } 
        } catch(error) {
            return res.status(401).json({
                Message: "Unauthorized",
            })
        }   
    }


    public downloadFileEnislog = (req: Request, res: Response) => {
        let pathFileEnislog =  this.fileService.downloadFileEnishLog(req);
        res.download(pathFileEnislog, 'enislog.txt', (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).send('Error downloading file');
            }
        })
    } 
        
}
