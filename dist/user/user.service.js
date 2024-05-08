"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const jwt_1 = require("../util/jwt/jwt");
class UserService {
    constructor() {
        this.jwt = new jwt_1.JWT();
    }
    login(userDTO) {
        return this.jwt.generateJWT(userDTO);
    }
    demo(token) {
        try {
            return this.jwt.verifyJWT(token);
        }
        catch (err) {
            return err;
        }
    }
}
exports.UserService = UserService;
