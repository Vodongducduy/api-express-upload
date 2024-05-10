
import { JWT } from "../util/jwt/jwt";
import { UserDTO } from "./dto/user.dto";

export class UserService {
    private jwt: JWT = new JWT();

    public login(userDTO: UserDTO):string {
        return this.jwt.generateJWT(userDTO);
    }
}