import { Request, Response } from 'express';
import { UpdateResult } from "mongoose";
import Tokens from '../Utils/token';
import Owners from '../models/Owners';
import HashPassword from '../Utils/hash';
import validator from "../Utils/validator"
import Users from '../models/user';
import OtpModel from '../models/Otp'; 
import {sendOtpEmail,sendResetPasswordLink } from '../services/email.service';
import ResetLinkModel from '../models/ResetPassword';
interface ResetLinkRequestBody {
	email:string 
}
interface success { 
	message:string,
	err?:any
} 

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
	const UserRole = validator.isUserRoleOwnerOrUser(email); 

	const HashedPassword = await Owners.findOne({email:email})

         if(!HashedPassword){ 
	res.status(400).json({message:"user not found"})
	    return 
	}


	if(HashedPassword.password){
		if(!await validator.isPasswordMatch(password, HashedPassword.password)){
			res.status(404).json({message:"password is not correct"})
			return
		}

	}
           
	const token = Tokens.SignUser_JWT_Token(HashedPassword.email, HashedPassword?.role, process.env.JWT_SECRET_KEY!)

        res.cookie("accessToken", token,{ 
         httpOnly:true,
         sameSite:"strict",
	 secure:process.env.NODE_ENV == "production",
         maxAge:100,
	})

	res.status(200).json({message:"user login successfully"})

}

const SendOTP = async (req:Request, res:Response) => {
	/// check if the user email exixt if not send them they should first register 
	if(!req.body?.email){
		res.status(400).json({message:"email is required if you want to reset your password "}) 
		return 
	}

	try {
		const {email} = req.body

		const checkuserFromOwners = await Owners.findOne({email:email})
		const checkusrFromUsers = await Users.findOne({email:email})  


		if(!checkuserFromOwners && !checkusrFromUsers){ 
			res.status(400).json({message:"user is not found with the provided email check your email again "}) 
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
		await sendOtpEmail(email, otp)	
		res.status(200).json({message:"otp sent successfully"})
	} catch (error) {
		res.status(500).json({message:"internal server error", error}) 	
	} 
}

const verifyOtp = async (req:Request, res:Response) => {
	if(!req.body.email || !req.body.Otp){
		res.status(400).json({message:"email and opt are mandatory"}) 
		return 
	}
	try {
		const {email, Otp} = req.body

		// get the opt from the data and match them and also the email 
		const Record = await OtpModel.findOne({email:email}) 

		if(!Record?._id) {
			res.status(400).json({message:"no OTP found for this email"}) 
			return 
		}


		if(Number(Date.now())  > Number(Record.expiresAt)) {
			res.status(400).json({message:"OTP expired "}) 
			return 
		}

		if(Record.otp !== Otp) {
			res.status(400).json({message:"no OTP found for this email"}) 
			return 
		}
		res.status(200).json({message:"OTP verifyed successfully"}) 

	} catch (err) {
		console.log(err)	
		res.status(500).json({message:"something went wrong"}) 
	}

}

const sendResetLink = async (req:Request<{}, {}, ResetLinkRequestBody>, res:Response<success>) => { 
	if (!req.body || !req.body.email) {
		res.status(400).json({ message: "email is required" });
		return 
	}

	const  { email } = req.body 
	try {

		const checkUserExistFromUsers = await Users.findOne({email:email}) 
		const checkUserExistFromOwners = await Owners.findOne({email:email}) 

		if(!checkUserExistFromUsers && !checkUserExistFromOwners) { 
			res.status(400).json({message:`user is not found with the email of ${email} `})
			return 
		}

		const token = Tokens.ResetPasswordLink()
		const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
		const StoreToken = await ResetLinkModel.insertOne({email, token, expiresAt}) 

		if(!StoreToken._id) {
			res.status(500).json({message:"internal server error"})
			return  
		}
		const  resetLink:string = `http://localhost:3000/ResetPassword?token=${token}&email=${email}`

		sendResetPasswordLink(email, resetLink)

		res.status(200).json({message:"reset-password send successfully"})
	} catch (err) {
		res.status(500).json({message:"internal server error", err})
		return 
	}

}

const ResetPassword = async (req: Request, res: Response) => {
	const { newPassword } = req.body;
	const { token, email } = req.query;
     try {

	if (typeof email !== "string" || typeof token !== "string") {
		res.status(400).json({ message: "Invalid request" });
			return 
	}

	const storedToken = await ResetLinkModel.findOne({ email });
	if (!storedToken) {
		res.status(400).json({ message: "User not found" });
			return 
	}

	if (token !== storedToken.token) {
		res.status(401).json({ message: "Invalid or expired token" });
			return
	}

	const isUser = await validator.isUserRoleOwnerOrUser(email);
	if (!isUser) {
		res.status(400).json({ message: "User not found" });
			return 
	}

	const hashedPassword = await HashPassword(newPassword);

	let updateResult: UpdateResult;
	if (!isUser.isOwner) {
		updateResult = await Users.updateOne({ email }, { password: hashedPassword });
	} else {
		updateResult = await Owners.updateOne({ email }, { password: hashedPassword });
	}

	if (updateResult.acknowledged) {
		res.status(200).json({ message: "Password reset successfully" });
			return
	} 
		res.status(500).json({ message: "Something went wrong" });
     } catch (err) {
	res.status(500).json({ message: "Something went wrong" });
     }

};


export default {sendResetLink, ResetPassword, Login, Register ,verifyOtp, SendOTP};
