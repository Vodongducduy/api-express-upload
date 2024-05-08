
import { JWT } from "../util/jwt/jwt";
import { UserDTO } from "./dto/user.dto";

export class UserService {
    private jwt: JWT = new JWT();

    public login(userDTO: UserDTO):string {
        return this.jwt.generateJWT(userDTO);
    }

    public demo(token: string) {
        try {
            return this.jwt.verifyJWT(token);
        }catch(err) {
            return err;
        }
    }
}