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
            id: req.body.id,
        } ;

        let result: string = this.userService.login(userDTO);
        res.json({
            Token: result,
        })
    }

    public demo = (req: Request, res: Response) => {
        let auth = req.headers["authorization"]?.split(" ");
        if (auth != undefined) {
            let token: string = auth[1];
            try {
                res.status(200).json({
                    Data:this.userService.demo(token),
                })
            } catch (err) {
                res.status(400).json({
                    Message: "Unauthorization",
                });
            }
        } 
    }
}