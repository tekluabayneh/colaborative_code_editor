import jwt from "jsonwebtoken";
import { Request } from 'express';
import type { returnMessage } from "../types/user"
const checkPassworlength = (password: string, email: string): boolean => {
    if (password.length < 6 || password.length > 30) {
        return false
    }
    // if email is not the correct email type return message for the user  
    const regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regx.test(email)) {
        return false
    }
    return true
}

const ValidateRegister = (request: Request): returnMessage => {
    const { email, username, password } = request.body
    if (!email || !username || !password) {
        return {
            isValid: false,
            message: " Validation failed: Missing required fields"
        }
    }

    if (!checkPassworlength(password, email)) {
        return {
            isValid: false,
            message: "Invalid email or password length is not correct"
        }
    }
    return {
        isValid: true,
        message: "Validation pass"
    }
}

const ValidateLogin = (request: Request): returnMessage => {
    const { email, password } = request.body
    if (!email || !password) {
        return {
            isValid: false,
            message: " Validation failed: Missing required fields"
        }
    }

    if (!checkPassworlength(password, email)) {
        return {
            isValid: false,
            message: "Invalid email or password length is not correct"
        }

    }
    return {
        isValid: true,
        message: "Validation pass"
    }
}

const VerifyJwtToken = (token: string, secretKey: string): string | jwt.JwtPayload => {
    try {
        const decoded = jwt.verify(token, secretKey)
        return decoded as jwt.JwtPayload;
    } catch (error) {
        return "Invalid token"
    }
}

const isUserAlreadyRegistered = (email: string): boolean => {
    return true
}

export default { ValidateLogin, ValidateRegister, VerifyJwtToken, isUserAlreadyRegistered }


// validateing step we hvae to take 
// first check if the input value are present or not
// then check if the input value are valid or not
