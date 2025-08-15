import jwt from "jsonwebtoken";
import { nanoid } from "nanoid"

const GenerateUsertoken = (): string => {
    return nanoid(32);
}

const ResetPasswordLink =() => { 
return nanoid(10) 
}

const SignUser_JWT_Token = (email: string, role:string, secretKey: string)=> {
    return jwt.sign({email, role}, secretKey, { expiresIn: "1h" });
}

const Otp = ():string => { 
return nanoid(6)
}


export default { SignUser_JWT_Token, GenerateUsertoken , Otp, ResetPasswordLink}
