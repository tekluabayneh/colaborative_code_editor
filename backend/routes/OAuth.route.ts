import passport from "passport";
import {Request, Response, NextFunction, Router } from "express"
const OAuthRouter = Router() 


OAuthRouter.get("/google", (req:Request, res:Response, next:NextFunction) => {
	passport.authenticate("google", { scope:["profile", "email"]})(req, res, next)
})



OAuthRouter.get("/google/callback", 
	passport.authenticate("google", { failureRedirect:"http://localhost:3000/Auth"}), 
	async (req:Request, res:Response) => {
		/// get usre role and send to client help to validate things
		console.log(req)
		res.redirect("http://localhost:3000/dashboard")
	})



OAuthRouter.get("/github", (req:Request, res:Response, next:NextFunction) => {
	passport.authenticate("github", {scope:["profile", "user:email"]})(req, res, next)
})



OAuthRouter.get("/github/callback", passport.authenticate("github", { failureRedirect:"http://localhost:3000/Auth"}) 
	,async (req:Request,res:Response) => {
		console.log("github data",req)
		res.redirect("http://localhost:3000")
	})

export default OAuthRouter
