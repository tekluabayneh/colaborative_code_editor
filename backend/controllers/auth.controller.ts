import { Request, Response } from 'express';

const Login = (req: Request, res: Response) => {

}
const Register = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Registration successful' });
    res.end();
}

export default { Login, Register };

