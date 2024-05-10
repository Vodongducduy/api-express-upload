"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadMutler = void 0;
const multer_1 = __importDefault(require("multer"));
const jwt_1 = require("../jwt/jwt");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jwt = new jwt_1.JWT();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return cb(new Error('Unauthorized'), '');
        }
        let userInfor = jwt.verifyJWT(token);
        let directoryPath = path_1.default.join(__dirname, "..", "..", `../uploads/${userInfor.name}`, "resource");
        if (!fs_1.default.existsSync(directoryPath)) {
            fs_1.default.mkdirSync(directoryPath, { recursive: true });
        }
        cb(null, directoryPath);
    },
    filename: function (req, file, cb) {
        if (file.originalname.includes("sql") || file.originalname.includes("param") || file.originalname.includes("data")) {
            cb(null, file.originalname);
        }
        else {
            cb(new Error('File name must contain "sql" or "type"'), '');
        }
    }
});
exports.UploadMutler = (0, multer_1.default)({ storage: storage });
