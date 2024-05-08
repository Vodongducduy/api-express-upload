"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
class FileController {
    constructor(fileService) {
        this.uploadFile = (req, res) => {
            try {
                let enislogPath = this.fileService.uploadFileSQL(req);
                if (enislogPath.length > 0) {
                    res.status(200).json({
                        Message: "Download file Enlislog.txt successfully!",
                    });
                }
            }
            catch (error) {
                return res.status(401).json({
                    Message: "Unauthorized",
                });
            }
        };
        this.downloadFileEnislog = (req, res) => {
            let pathFileEnislog = this.fileService.downloadFileEnishLog(req);
            res.download(pathFileEnislog, 'enislog.txt', (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                    res.status(500).send('Error downloading file');
                }
            });
        };
        this.fileService = fileService;
    }
}
exports.FileController = FileController;
