import { Request, Response } from 'express';
import Tokens from '../Utils/token';
import checkRole from "../middlewares/role.middleware";
import Owners from '../models/Owners';
import HashPassword from '../Utils/hash';
import validator from "../Utils/validator"
const Register = async (req: Request, res: Response) => {
	const { email, password, userName } = req.body;

	const HashedPassword = await HashPassword(password)

	const userInfo = { userName: userName, password: HashedPassword, email: email }

	const AddOwner = await Owners.insertOne(userInfo)

	if (!AddOwner || !AddOwner._id) {
		res.status(400).json({ error: 'User was not registered correctly' });
		return;
	}


	res.status(200).json({ message: 'Registration successful', });
}


const Login = async (req: Request, res: Response) => {
	const { email, password, userName } = req.body;

	// check usr role get the role from the db using the email
	const UserRole = await checkRole(email); 

	const HashedPassword = await Owners.findOne({email:email})

	if(HashedPassword?.password){
		if(!await validator.isPasswordMatch(password, HashedPassword.password)){
			res.status(404).json({Message:"pasword is not correct"})
			return
		}

	}




	const token = Tokens.SignUser_JWT_Token(email, process.env.JWT_SECRET_KEY!)
	res.status(200).json({message:"user login successful", userRole:UserRole, toen:token})


}




export default { Login, Register };

