import { Request, Response } from 'express';
import Tokens from '../Utils/token';
import Owners from '../models/Owners';
import { Sign } from 'crypto';
const Register = async (req: Request, res: Response) => {
    const { email, password, userName } = req.body;

    const userInfo = { userName: userName, password: password, email: email }
    const AddOwner = await Owners.insertOne(userInfo)

    if (!AddOwner || !AddOwner._id) {
        res.status(400).json({ error: 'User was not registered correctly' });
        return;
    }

    const token = Tokens.SignUser_JWT_Token(email, process.env.JWT_SECRET_KEY!)
    res.status(200).json({ message: 'Registration successful', JTw_toke: token });
}


const Login = async (req: Request, res: Response) => {
    const { email, password, userName } = req.body;
}




export default { Login, Register };

