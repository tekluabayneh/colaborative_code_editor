import {Strategy as googlesterategy, type Profile} from "passport-google-oauth20"
import {Strategy as githubsterategy  } from "passport-github2"
import { type PassportStatic } from "passport"
import owners from "../models/Owners"

interface usertype {
	userName:string,
	 email:string,
	 photo:string 
}

const GetEmail = (profile:Profile):string => {
	return  profile.emails  && profile.emails?.length > 0 && profile.emails[0].value ? profile.emails[0].value : "";
}


const GetPhoto = (profile: Profile): string => {
	return profile.photos?.[0]?.value ?? "";
};



export const configuregoogleAuth = (passport:PassportStatic) => {

	passport.use(
		new googlesterategy( {
			clientID:process.env.GOOGLE_CLIENTID ?? "",
			clientSecret:process.env.GOOGLE_CLIENTSECRET ?? "",
			callbackURL:process.env.GOOGLE_CALBACKURL, 
		},
			async (accesstoken:string, refrechtoken:string, profile:Profile,done:(error:any, user:any)=> void ) => { try {
                                   const userName = profile.name?.familyName
                                   if(!userName) return done(null, false) 

				const user:usertype = {
					userName:userName,
					email:GetEmail(profile),
					photo:GetPhoto(profile)
				}

				console.log(user) 

				// check if user exist in db 
				const checkqueryfromowner = await owners.find({email:user.email})

				console.log(checkqueryfromowner)

				if (checkqueryfromowner) return done(null, user)

				const userdata = await owners.insertOne(user)

				if(userdata) return done(null, user)


			} catch (error) {
					console.log("error while sign in with google")
					done(error, null)
				} 

			})

	)
}


export const configuregithubstrateg = (passport:PassportStatic) => {
	passport.use(
		new githubsterategy({
			clientID: process.env.GITHUB_CLIENTID!,
			clientSecret: process.env.GITHUB_CLIENTSECRET!,
			callbackURL:process.env.GITHUB_CLLBACKURL!,
			scope: ["user:email"]
		},
			async (accesstoken:string, refrechtoken:string, profile:Profile,done:(error:any,user:any)=> void ) => {
				try {
					let username
					if(!profile._json.name) return done(null, false)

					username = profile._json.name.trim().split(" ")[0]
					const user:usertype = {
						userName: username,
						email:GetEmail(profile),
						photo: GetPhoto(profile)
					};

                                console.log(profile)

				   console.log(user)

					// check if the user exist
					const checkqueryfromowner = await owners.findOne({email:user.email})

					if(checkqueryfromowner) return  done(null, user) 

					const userdata = await owners.insertOne(user)
					if(!userdata) return  done(null, null)
					if(userdata) return done(null, user)

				} catch (error) {
					console.log("error while sign in with github")
					done(error, null)
				} 

			})

	)}

