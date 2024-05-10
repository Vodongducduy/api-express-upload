import multer from "multer";
import { JWT } from "../jwt/jwt";
import { UserDTO } from "../../user/dto/user.dto";
import fs from 'fs';
import path from 'path';

const jwt: JWT = new JWT();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return  cb(new Error('Unauthorized'), '');
        } 
        let userInfor = jwt.verifyJWT(token) as UserDTO;
        let directoryPath = path.join(__dirname,"..","..", `../uploads/${userInfor.name}`, "resource");
        if(!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, {recursive: true});
        }  
        cb(null, directoryPath);
    },
    filename: function(req, file, cb) {
        if (file.originalname.includes("sql") || file.originalname.includes("param") || file.originalname.includes("data")) {
            cb(null, file.originalname); 
        } else {
            cb(new Error('File name must contain "sql" or "type"'), '');
        }
        
    }
});

export const UploadMutler = multer({storage: storage});

