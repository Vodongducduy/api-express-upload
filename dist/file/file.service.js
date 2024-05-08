"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const jwt_1 = require("../util/jwt/jwt");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FileService {
    constructor() {
        this.jwt = new jwt_1.JWT();
    }
    uploadFileSQL(req) {
        var _a;
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new Error("Unauthorization");
        }
        let userInfor = this.jwt.verifyJWT(token);
        // this.createDirectory(userInfor);
        if (req.files && req.files.length == 2) {
            let fileArray = req.files;
            let enislogPath = setEnisLog(userInfor.name, fileArray);
            return enislogPath;
        }
        return "";
    }
    downloadFileEnishLog(req) {
        var _a;
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new Error("Unauthorization");
        }
        let userInfor = this.jwt.verifyJWT(token);
        let fileEnislog = path_1.default.join(process.cwd(), "uploads", userInfor.name, "result", "enislog.txt");
        return fileEnislog;
    }
}
exports.FileService = FileService;
function setEnisLog(name, files) {
    let fileEnislog = path_1.default.join(process.cwd(), "uploads", name, "result", "enislog.txt");
    let filePath = path_1.default.join(process.cwd(), "uploads", name, "resource", "param.txt");
    let steam = fs_1.default.createWriteStream(fileEnislog, { flags: "w" });
    let arryField = [];
    let myMap = new Map();
    let in_bkg_no = "SINE02945600";
    let data = fs_1.default.readFileSync(filePath, "utf-8");
    let lines = data.toLowerCase().split("\n");
    for (let i = 0; i < lines.length; i++) {
        let array = lines[i].trim().split(/\s+/);
        if ("," === array[0]) {
            arryField.push(array[1]);
        }
        else if ("" !== array[0]) {
            arryField.push(array[0]);
        }
    }
    filePath = path_1.default.join(process.cwd(), "uploads", name, "resource", "sql.txt");
    data = fs_1.default.readFileSync(filePath, "utf-8");
    for (let i = 0; i < arryField.length; i++) {
        if (data.includes(`in_param.${arryField[i]}`) && !myMap.has(arryField[i])) {
            steam.write(`ENIS_LOG_PRC(SYSDATE,'SPC_SBC_FNC',Param:${arryField[i]}:||in_param.${arryField[i]},${in_bkg_no});\n`);
            // console.log(`ENIS_LOG_PRC(SYSDATE,'SPC_SBC_FNC',Param:${arryField[i]}:||in_param.${arryField[i]},${in_bkg_no});`);
        }
        else if (data.includes(arryField[i]) && !myMap.has(arryField[i])) {
            steam.write(`ENIS_LOG_PRC(SYSDATE,'SPC_SBC_FNC',Param:${arryField[i]}:||${arryField[i]},${in_bkg_no});\n`);
            // console.log(`ENIS_LOG_PRC(SYSDATE,'SPC_SBC_FNC',Param:${arryField[i]}:||${arryField[i]},${in_bkg_no});`);
        }
    }
    steam.end();
    return fileEnislog;
}
