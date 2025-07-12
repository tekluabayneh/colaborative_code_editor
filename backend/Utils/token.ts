import jwt from "jsonwebtoken";
import { nanoid } from "nanoid"

const GenerateUsertoken = (): string => {
    return nanoid(32);
}

const SignUser_SWT_Toekn = (userId: string, secretKey: string): string => {
    return jwt.sign(userId, secretKey, { expiresIn: "1h" });
}


export default { SignUser_SWT_Toekn, GenerateUsertoken }
