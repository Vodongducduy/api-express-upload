import { UserDTO } from "./dto/user.dto";
import { UserService } from "./user.service";
import { Request, Response } from "express";


export class UserController {
    private userService: UserService;
    constructor(userService: UserService) {
        this.userService = userService;
    }

    public login = (req:Request, res: Response) => {

        let userDTO: UserDTO = {
            name :req.body.name,
            bkgNo: req.body.bkgNo,
        } ;

        let result: string = this.userService.login(userDTO);
        res.json({
            Token: result,
        })
    }
}