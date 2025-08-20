import passport from "passport";
import axios from "axios"
import Tokens from "../Utils/token";
import {Request, Response, NextFunction, Router } from "express"
const OAuthRouter = Router() 
	interface OauthType {
	  userName:string,
	  email:string,
	  photo:string,
		}

OAuthRouter.get("/google", (req:Request, res:Response, next:NextFunction) => {
	passport.authenticate("google", { scope:["profile", "email"]})(req, res, next)
})



OAuthRouter.get("/google/callback", 
	passport.authenticate("google", { failureRedirect:"http://localhost:3000/Auth"}), 
	async (req:Request, res:Response) => {
		const user = (req.user as OauthType).email
	        const role = "Owner"

	const token = Tokens.SignUser_JWT_Token(user, role , process.env.JWT_SECRET_KEY!)
	       res.cookie("accessToken", token,{ 
	        httpOnly:true,
	        sameSite:"lax",
		 secure:false,
	        maxAge:100 * 60 * 60 * 60,
		signed:false,
	})
       
	       await axios.post("http://localhost:5000/api/auth/sendOtp", {email:user});
		const userEmail = encodeURIComponent(user)
		res.redirect(`http://localhost:3000/verifyOtp?email=${userEmail}`)
	})



OAuthRouter.get("/github", (req:Request, res:Response, next:NextFunction) => {
	passport.authenticate("github", {scope:["profile", "user:email"]})(req, res, next)
})



OAuthRouter.get("/github/callback", passport.authenticate("github", { failureRedirect:"http://localhost:3000/Auth"}) 
	,async (req:Request,res:Response) => {
	  const user = (req.user as OauthType).email 
	 const role = "Owner" 
	 const token = Tokens.SignUser_JWT_Token(user,role, process.env.JWT_SECRET_KEY!)

	       res.cookie("accessToken", token,{ 
	        httpOnly:true,
	        sameSite:"lax",
		 secure:false,
	        maxAge:100 * 60 * 60 * 60,
		 signed:false,
	})
	       await axios.post("http://localhost:5000/api/auth/sendOtp", {email:user});

		const userEmail = encodeURIComponent(user)
		res.redirect(`http://localhost:3000/verifyOtp?email=${userEmail}`)

	})

export default OAuthRouter
