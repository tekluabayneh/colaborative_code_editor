import passport from "passport";
import {Request, Response, NextFunction, Router } from "express"

const OAuthRouter = Router() 

OAuthRouter.get("/google", (req:Request, res:Response, next:NextFunction) => {
	passport.authenticate("google", { scope:["profile", "email"]})(req, res, next)
})



OAuthRouter.get("google/callback", 
	passport.authenticate("google", { failureRedirect:"failure redirect url"}), 
	async (req:Request, res:Response) => {

		/// get usre role and send to client help to validate things
		res.redirect("dashboard url")

	}

)

OAuthRouter.get("github", (req:Request, res:Response, next:NextFunction) => {
	passport.authenticate("google", {scope:["profile", "user:email"]})(req, res, next)
})

OAuthRouter.get("github/callback", passport.authenticate("github", { failureRedirect:"faiure url"}) 
	,async (req:Request,res:Response) => {

		res.redirect("redirect ur")


	} 

)
