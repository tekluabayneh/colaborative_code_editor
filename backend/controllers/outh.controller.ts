import {Strategy as GoogleSterategy, profile} from "passport-google-oauth20"
import { Strategy as GithubSterategy  } from "passport-github2"
import { Passport, type PassportStatic } from "passport"
import Owners from "../models/Owners"
import Users from "../models/user"

type argsType = {
	req:Request,
	accessToken:string,
	refrechToken:string,
	profile:profile,
	done:(user:any,error?:any ) =>void 
}


export const configureGoogleAuth = (passport:PassportStatic) => {

	passport.use(
		new GoogleSterategy(
			{clientId:"one", secrectId:"tow", callbackUrl:"callbackUrl", passReqToCallback:true},
			async (req:Request, accessToken:string, refrechToken:string, profile:profile,done:(error:any, user:any)=> void ) => {
				try {
					const User = {
						id:profile.id,
						firstName:profile.name.familyName,
						lastNam:profile.name.givenName,
						email:profile.emails[0].value,
						photo:profile.photos[0].value 
					}

					// check if user exist in db 
					const CheckQueryFromOwner = await Owners.find({email:User.email})
					const CheckQueryFromUser = await Users.find({email:User.email})

					if(CheckQueryFromUser){
						done(null, User)
						return 
					} else if (CheckQueryFromOwner){
						done(null, User)
						return 
					}

					// otherwise if the user does not exit register/stre the record in db 

					const userData = await Owners.insertOne(User)

					if(userData){
						done(null, User)
						return
					}


				} catch (error) {
					console.log("error while sign in with google")
					done(error, null)
				} 

			})

	)
}


export const configureGitHubStrategy = (passport:PassportStatic) => {
	passport.use(
		new GithubSterategy(
			{clientId:"one", secrectId:"tow", callbackUrl:"callbackUrl", passReqToCallback:true},
			async (req:Request, accessToken:string, refrechToken:string, profile:profile,done:(error:any,user:any)=> void ) => {
				try {

					let fullName = profile._json.name;

					let firstName = "";
					let lastName = "";

					if (fullName) {
						const parts = fullName.trim().split(" ");
						firstName = parts[0];
						lastName = parts.slice(1).join(" ") || "";
					} else {
						// fallback: use username as both first and last name
						firstName = profile.username;
						lastName = profile.username;
					}

					const user = {
						id: profile.id,
						username: profile.username,
						photo: profile.photos?.[0]?.value || "",
						email: profile.emails?.[0]?.value ?? null,
						firstName,
						lastName,
					};

					// check if the user exist
					const CheckQueryFromOwner = Owners.findOne({email:user.email})
					const CheckQueryFromUser =  Users.findOne({email:user.email}) 

					// if the user already exist just no need to store the data
					if(await CheckQueryFromOwner){
						done(null, user) 
						return 
					}else if(await CheckQueryFromUser){
						done(null, user)
						return 
					}



					const userData = await Owners.insertOne(user)
                                       if(!userData){
    done(null, null)
						return 
					}
					if(userData){
						done(null, user)
						return
					}

				} catch (error) {
					console.log("error while sign in with Github")
					done(error, null)
				} 

			})

	)}

