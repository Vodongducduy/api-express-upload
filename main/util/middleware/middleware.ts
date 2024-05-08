import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
const secretkey = "swam";
const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({
            Message: "Unauthorized",
        })
    }

    try {
        jwt.verify(token, secretkey);
        next();
    } catch(error){
        return res.status(401).json({ message: 'Unauthorized'});
    }
}

export default AuthMiddleware;