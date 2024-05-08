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
            let enislogPath =  setEnisLog(userInfor.name,fileArray);
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

}

function setEnisLog(name: string,files :Express.Multer.File[]): string {

    let fileEnislog =  path.join(process.cwd(), "uploads", name, "result", "enislog.txt");
    let filePath = path.join(process.cwd(), "uploads", name, "resource", "param.txt");
    let steam = fs.createWriteStream(fileEnislog, {flags : "w"});
    let arryField: string[] = [];
    let myMap = new Map();
    let in_bkg_no: string = "SINE02945600";

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
            steam.write(`ENIS_LOG_PRC(SYSDATE,'SPC_SBC_FNC',Param:${arryField[i]}:||in_param.${arryField[i]},${in_bkg_no});\n`)
            // console.log(`ENIS_LOG_PRC(SYSDATE,'SPC_SBC_FNC',Param:${arryField[i]}:||in_param.${arryField[i]},${in_bkg_no});`);
        } else if (data.includes(arryField[i]) && !myMap.has(arryField[i])) {
            steam.write(`ENIS_LOG_PRC(SYSDATE,'SPC_SBC_FNC',Param:${arryField[i]}:||${arryField[i]},${in_bkg_no});\n`);
            // console.log(`ENIS_LOG_PRC(SYSDATE,'SPC_SBC_FNC',Param:${arryField[i]}:||${arryField[i]},${in_bkg_no});`);
        }
    }
    steam.end();


    return fileEnislog;
    
}
 

