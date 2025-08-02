import jwt from "jsonwebtoken";
import { nanoid } from "nanoid"

const GenerateUsertoken = (): string => {
    return nanoid(32);
}

const SignUser_JWT_Token = (email: string, secretKey: string): string => {
    return jwt.sign({email}, secretKey, { expiresIn: "1h" });
}



export default { SignUser_JWT_Token, GenerateUsertoken }
