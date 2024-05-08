"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.login = (req, res) => {
            let userDTO = {
                name: req.body.name,
                id: req.body.id,
            };
            let result = this.userService.login(userDTO);
            res.json({
                Token: result,
            });
        };
        this.demo = (req, res) => {
            var _a;
            let auth = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ");
            if (auth != undefined) {
                let token = auth[1];
                try {
                    res.status(200).json({
                        Data: this.userService.demo(token),
                    });
                }
                catch (err) {
                    res.status(400).json({
                        Message: "Unauthorization",
                    });
                }
            }
        };
        this.userService = userService;
    }
}
exports.UserController = UserController;
