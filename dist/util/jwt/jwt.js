"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWT {
    constructor() {
        this.secretkey = "swam";
    }
    generateJWT(payload) {
        return jsonwebtoken_1.default.sign(payload, this.secretkey, { expiresIn: "1h" });
    }
    verifyJWT(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.secretkey);
            return decoded;
        }
        catch (error) {
            throw new Error("Invalid token");
        }
    }
}
exports.JWT = JWT;
