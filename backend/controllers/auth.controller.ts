import { Request, Response } from 'express';
import Tokens from '../Utils/token';

///give the usr defalult admin role 
const Login = (req: Request, res: Response) => {
    const { email } = req.body;
    Tokens.SignUser_SWT_Toekn(email, process.env.JWT_SECRET_KEY!)


}
const Register = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Registration successful' });
    res.end();
}

export default { Login, Register };

