import { Request } from 'express';
import { JWT } from "../util/jwt/jwt";
import { UserDTO } from '../user/dto/user.dto';

import fs from 'fs';
import path from 'path';

export class FileService {
    private jwt: JWT = new JWT();

    public uploadFileSQL(req:Request): string {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new Error("Unauthorization");
        }
        
        let userInfor = this.jwt.verifyJWT(token) as UserDTO;
        // this.createDirectory(userInfor);
        if (req.files && req.files.length == 2) {
            let fileArray = req.files as Express.Multer.File[];
            let enislogPath =  setEnisLog(userInfor.name,userInfor.bkgNo,fileArray);
            return enislogPath;
        }
        return "";
    }


    public downloadFileEnishLog(req: Request): string {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new Error("Unauthorization");
        }
        let userInfor =  this.jwt.verifyJWT(token) as UserDTO
        let fileEnislog =  path.join(process.cwd(), "uploads", userInfor.name, "result", "enislog.txt");
        return fileEnislog;
    }


    public uploadFileData(req: Request) {
        if (!req.file || (req.file.originalname !== "data.txt")) {
            throw new Error("Please check file data.txt");
        }
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new Error("Unauthorization");
        }
        let userInfor = this.jwt.verifyJWT(token) as UserDTO;
        getAnalyzeSQLFile(userInfor.name, req.file);
    }


    public downloadFileAnalyzeSQl(req: Request): string {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new Error("Unauthorization");
        }
        let userInfor =  this.jwt.verifyJWT(token) as UserDTO
        let fileAnalyzeSql =  path.join(process.cwd(), "uploads", userInfor.name, "result", "SqlAnalyze.txt");
        return fileAnalyzeSql;
    }

}


function getAnalyzeSQLFile(name: string, file: Express.Multer.File) {

    let fileAnalyzeSQl = path.join(process.cwd(), "uploads", name, "result", "SqlAnalyze.txt");
    let fileData = path.join(process.cwd(), "uploads", name, "resource", "data.txt");
    let fileSql = path.join(process.cwd(), "uploads", name, "resource", "sql.txt"); 
    let steam = fs.createWriteStream(fileAnalyzeSQl, {flags : "w"});

    let sqlString = fs.readFileSync(fileSql, "utf-8");

    // get Param and data from param.txt
    let data = fs.readFileSync(fileData, "utf-8");
    let line = data.split("\n");
    let dataMap = new Map();
    
    for (let i = 0; i < line.length; i++) {
        // let arrayLine =  line[i].split(":");
       let data =  line[i].split(":");
       let dataParam = data[2].includes("\r") ? data[2].replace("\r", ""): data[2];
       if (dataParam === "") {
           dataParam = "null";
       }
    //    console.log(dataOfParam);
       if (data[1].includes("param")) {
        let param = data[1].replace("param|", "");
        if (sqlString.includes(`.${param}`)) sqlString = sqlString.replaceAll(`.${param}`, `.${param.toUpperCase()}`)
        if (sqlString.includes(param) && dataParam !== "null") {
            sqlString = sqlString.replaceAll(param, `'${dataParam}'`);
        } else {
            sqlString = sqlString.replaceAll(param, `${dataParam}`);
        }
       } else if (sqlString.includes(`in_param.${data[1]}`) && dataParam !== "null") {
        sqlString = sqlString.replaceAll(`in_param.${data[1]}`,`'${dataParam}'`);
       } else {
        sqlString = sqlString.replaceAll(`in_param.${data[1]}`,`${dataParam}`);
       }
    }
    
    steam.write(sqlString);
    steam.end();

}

function setEnisLog(name: string,in_bkg_no: string,files :Express.Multer.File[]): string {

    let fileEnislog =  path.join(process.cwd(), "uploads", name, "result", "enislog.txt");
    let filePath = path.join(process.cwd(), "uploads", name, "resource", "param.txt");
    let steam = fs.createWriteStream(fileEnislog, {flags : "w"});
    let arryField: string[] = [];
    let myMap = new Map();


    let data = fs.readFileSync(filePath, "utf-8");
    let lines = data.toLowerCase().split("\n");

    for (let i = 0; i < lines.length; i++) {
        let array = lines[i].trim().split(/\s+/);
        if ("," === array[0]) {
            arryField.push(array[1]);
        } else if ("" !== array[0]) {
            arryField.push(array[0]);
        }
        
    }

    filePath =  path.join(process.cwd(), "uploads", name, "resource", "sql.txt");
    data = fs.readFileSync(filePath, "utf-8");
    for (let i = 0; i < arryField.length; i++) {
        if (data.includes(`in_param.${arryField[i]}`) && !myMap.has(arryField[i])) {
            steam.write(`ENIS_LOG_PRC(SYSDATE,'SPC_SBC_FNC','Param:${arryField[i]}:'||in_param.${arryField[i]},'${in_bkg_no}');\n`)
        } else if (data.includes(arryField[i]) && !myMap.has(arryField[i])) {
            steam.write(`ENIS_LOG_PRC(SYSDATE,'SPC_SBC_FNC','Param:param|${arryField[i]}:'||${arryField[i]},'${in_bkg_no}');\n`);
        }
    }
    steam.end();


    return fileEnislog;
    
}
 

