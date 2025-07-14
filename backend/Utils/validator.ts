import jwt from "jsonwebtoken";
import { Request } from 'express';
import type { returnMessage } from "../types/user"
import Owners from "../models/Owners";

const validateEmailAndPassword = (password: string, email: string): boolean => {
    if (password.length < 6 || password.length > 30) {
        return false
    }
    // if email is not the correct email type return message for the user  
    const regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regx.test(email)
}

const ValidateRegister = (request: Request): returnMessage => {
    const { email, userName, password } = request.body
    if (!email || !userName || !password) {
        return {
            isValid: false,
            message: " Validation failed: Missing required fields"
        }
    }

    if (!validateEmailAndPassword(password, email)) {
        return {
            isValid: false,
            message: "Invalid email or password length is above 30"
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

    if (!validateEmailAndPassword(password, email)) {
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

const isUserAlreadyRegistered = async (email: string): Promise<boolean> => {
    const findUserByEmail = await Owners.find({ email: email })
    return findUserByEmail.length === 0 ? false : true
}

export default { ValidateLogin, ValidateRegister, VerifyJwtToken, isUserAlreadyRegistered }


// validateing step we hvae to take 
// first check if the input value are present or not
// then check if the input value are valid or not





