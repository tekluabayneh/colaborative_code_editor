import { Request, Response } from 'express';
import Tokens from '../Utils/token';
import checkRole from "../middlewares/role.middleware";
import Owners from '../models/Owners';
import HashPassword from '../Utils/hash';
import validator from "../Utils/validator"
import Users from '../models/user';
import OtpModel from '../models/Otp'; 
import sendOtpEmail from '../services/email.service';
import { verify } from 'crypto';

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
	res.status(200).json({message:"user login successfully", userRole:UserRole, token:token})

}

const SendOTP = async (req:Request, res:Response) => {
	const {email} = req.body
	/// check if the user email exixt if not send them they should first register 
	if(!email){
		res.status(400).json({Message:"email is required if you want to reset your password "}) 
		return 
	}

      const checkuserFromOwners = await Owners.findOne({email:email})
      const checkusrFromUsers = await Users.findOne({email:email})  


	if(!checkuserFromOwners && !checkusrFromUsers){ 
		res.status(400).json({Message:"user is not found with the provided email check your emai again "}) 
		return 
	}   


	// stpre the otp in db 
        const otp = Tokens.Otp() 

	const StoreOtp  = OtpModel.insertOne({email, otp }) 
     
	try {
	 await sendOtpEmail(email, otp)	
	res.status(200).json({message:"otp sent successfully"})
	} catch (error) {
	 res.status(500).json({message:"internal server error"}) 	
	} 
}

const verifyOtp = async (req:Request, res:Response) => {
 const {email, otp} = req.body
 
	if(!email || !otp){
	res.status(400).json({message:"email and opt are mandatory"}) 
	   return 
	}
  

	// get the opt from the data and match them and also the email 
	const Record = await OtpModel.findOne({email:email}) 

        if(!Record) {
	res.status(400).json({Message:"no OTP found for this email"}) 
	return 
	}
 

	if(Number(Date.now())  > Number(Record.expiresAt)) {
	res.status(400).json({Message:"OTP expired "}) 
	return 
	}

	if(Record.otp !== otp) {
	res.status(400).json({Message:"no OTP found for this email"}) 
	return 
	}


    await OtpModel.deleteOne({email:email}) 
	res.status(200).json({Message:"OTP verifyed successfully"}) 


}

export default { Login, Register ,verifyOtp, SendOTP};

