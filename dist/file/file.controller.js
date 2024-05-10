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
                        Message: "Generator file enlislog.txt successfully!",
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
        this.uploadDataSQL = (req, res) => {
            try {
                this.fileService.uploadFileData(req);
                res.status(200).json({
                    Message: "Update file data successfull!",
                });
            }
            catch (err) {
                res.status(400).json({
                    Message: err,
                });
            }
        };
        this.downloadFileAnalyzeSQL = (req, res) => {
            let pathFileAnalyzeSql = this.fileService.downloadFileAnalyzeSQl(req);
            res.download(pathFileAnalyzeSql, 'analyzeSql.txt', (err) => {
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
