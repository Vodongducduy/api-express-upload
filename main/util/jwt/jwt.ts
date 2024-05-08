import jwt  from "jsonwebtoken";

export class JWT {
    private secretkey = "swam";

    public generateJWT(payload:Object): string {
        return jwt.sign(payload, this.secretkey, {expiresIn: "1h"});
    }

    public verifyJWT(token: string) {

        try {
            const decoded = jwt.verify(token, this.secretkey);
            return decoded;
        } catch (error) {
            throw new Error("Invalid token");
        }
    }


}