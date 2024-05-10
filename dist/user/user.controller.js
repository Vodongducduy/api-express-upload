"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.login = (req, res) => {
            let userDTO = {
                name: req.body.name,
                bkgNo: req.body.bkgNo,
            };
            let result = this.userService.login(userDTO);
            res.json({
                Token: result,
            });
        };
        this.userService = userService;
    }
}
exports.UserController = UserController;
