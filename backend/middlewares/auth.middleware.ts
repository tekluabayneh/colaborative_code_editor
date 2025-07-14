import { Request, Response, NextFunction } from 'express';
import validateAuthRequest from '../Utils/validator';
import checkRole from './role.middleware';
const VerifyJwtToken = require('../Utils/validator').VerifyJwtToken;

//  sing JWT token
// give them role if they are admin or user 
// check if the user is already registered 
const ResgisterValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    console.log(await validateAuthRequest.isUserAlreadyRegistered(email))
    // validate the request body for registration
    if (!validateAuthRequest.ValidateRegister(req).isValid) {
        res.status(400).json({ message: validateAuthRequest.ValidateRegister(req).message });
        return
    }
    if (await validateAuthRequest.isUserAlreadyRegistered(email)) {
        res.status(400).json({ message: 'user already exist please check you email ' });
        return
    }

    next()
}


const LoginValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // validate the request body for registration
    if (!validateAuthRequest.ValidateLogin(req)) {
        res.status(400).json({ error: 'Invalid registration data' });
        return
    }

    if (await validateAuthRequest.isUserAlreadyRegistered(email)) {
        res.status(400).json({ message: 'user already exist please check you email ' });
        return
    }

    if (!VerifyJwtToken(email, process.env.JWT_SECRET_KEY)) {
        res.status(401).json({ message: 'Invalid JWT token' });
        return
    }

    // check usr role get the role from the db using the email 
    checkRole(email)
    next()
}


/// check the role // we have function for that in the midleware 
// validate request 
// check JWT token if it is valid 
// check if the user is already registered
// check if the user is  oging useing invite code and if the invite code is valid and redirect them to the dashboard and set thier role to user or admin or super admin 



export default { ResgisterValidate, LoginValidate };


