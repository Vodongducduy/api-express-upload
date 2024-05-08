import { Express} from "express";
import { UserModule } from "./user/user.module";
import { FileModule } from "./file/file.module";

export class AppModule {

    constructor(app: Express) {
        new UserModule(app).startApi();
        new FileModule(app).startApi();
    }
    
}