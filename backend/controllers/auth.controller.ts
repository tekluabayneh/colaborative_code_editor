import { Request, Response } from 'express';
import Tokens from '../Utils/token';
import checkRole from "../middlewares/role.middleware";
import Owners from '../models/Owners';
import HashPassword from '../Utils/hash';
import validator from "../Utils/validator"
import Users from '../models/user';
import OtpModel from '../models/Otp'; 
import sendOtpEmail from '../services/email.service';

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
	const { email, password} = req.body;

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
	res.status(200).json({message:"user login successfully", userRole:UserRole, token:token})

}

const SendOTP = async (req:Request, res:Response) => {
	/// check if the user email exixt if not send them they should first register 
	if(!req.body?.email){
		res.status(400).json({Message:"email is required if you want to reset your password "}) 
		return 
	}

	try {
		const {email} = req.body

		const checkuserFromOwners = await Owners.findOne({email:email})
		const checkusrFromUsers = await Users.findOne({email:email})  


		if(!checkuserFromOwners && !checkusrFromUsers){ 
			res.status(400).json({Message:"user is not found with the provided email check your emai again "}) 
			return 
		}   

		// stpre the otp in db 
		const otp = Tokens.Otp() 
		const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
		const StoreOtp  = await OtpModel.insertOne({email, otp, expiresAt}) 

		if(!StoreOtp._id) {
			res.status(500).json({message:"otp is not stored unsuccessfully"})
			return  
		}

		const  responseEmail = await sendOtpEmail(email, otp)	
		console.log(responseEmail)

		res.status(200).json({message:"otp sent successfully"})
	} catch (error) {
		res.status(500).json({message:"internal server error", error}) 	
	} 
}

const verifyOtp = async (req:Request, res:Response) => {
	console.log(req.body)
	if(!req.body.email || !req.body.Otp){
		res.status(400).json({message:"email and opt are mandatory"}) 
		return 
	}
	try {
		const {email, Otp} = req.body

		// get the opt from the data and match them and also the email 
		const Record = await OtpModel.findOne({email:email}) 

		if(!Record?._id) {
			res.status(400).json({Message:"no OTP found for this email"}) 
			return 
		}


		if(Number(Date.now())  > Number(Record.expiresAt)) {
			res.status(400).json({Message:"OTP expired "}) 
			return 
		}

		if(Record.otp !== Otp) {
			res.status(400).json({Message:"no OTP found for this email"}) 
			return 
		}
		res.status(200).json({Message:"OTP verifyed successfully"}) 

	} catch (err) {
		console.log(err)	
		res.status(500).json({Message:"something went wrong"}) 
	}

}

export default { Login, Register ,verifyOtp, SendOTP};








