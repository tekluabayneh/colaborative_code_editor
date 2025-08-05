import {Strategy as googlesterategy, type Profile} from "passport-google-oauth20"
import {Strategy as githubsterategy  } from "passport-github2"
import { type PassportStatic } from "passport"
import owners from "../models/Owners"
import users from "../models/user"
 

const GetEmail = (profile:Profile):string => {
 return  profile.emails  && profile.emails?.length > 0 && profile.emails[0].value ? profile.emails[0].value : "";
}


const GetPhoto = (profile: Profile): string => {
  return profile.photos?.[0]?.value ?? "";
};



export const configuregoogleAuth = (passport:PassportStatic) => {

	passport.use(
		new googlesterategy({clientID:"one", clientSecret:"tow", callbackURL:"callbackurl"},
			async (accesstoken:string, refrechtoken:string, profile:Profile,done:(error:any, user:any)=> void ) => { try {
					const user= {
						id:profile.id,
						firstname:profile.name?.familyName,
						lastname:profile.name?.givenName,
						email:GetEmail(profile),
						photo:GetPhoto(profile)
					}

					// check if user exist in db 
					const checkqueryfromowner = await owners.find({email:user.email})
					const checkqueryfromuser = await users.find({email:user.email})

					if(checkqueryfromuser){
						done(null, user)
						return 
					} else if (checkqueryfromowner){
						done(null, user)
						return 
					}

					// otherwise if the user does not exit register/stre the record in db 

					const userdata = await owners.insertOne(user)

					if(userdata){
						done(null, user)
						return
					}


				} catch (error) {
					console.log("error while sign in with google")
					done(error, null)
				} 

			})

	)
}


export const configuregithubstrateg = (passport:PassportStatic) => {
	passport.use(
		new githubsterategy( {clientID:"one", clientSecret:"tow", callbackURL:"callbackurl"},
			async (accesstoken:string, refrechtoken:string, profile:Profile,done:(error:any,user:any)=> void ) => {
				try {

					let fullname = profile._json.name;

					let firstname = "";
					let lastname = "";

					if (fullname) {
						const parts = fullname.trim().split(" ");
						firstname = parts[0];
						lastname = parts.slice(1).join(" ") || "";
					} else {
						// fallback: username as both first and last name
						firstname = profile?.username ?? ""
						lastname = profile?.username ?? "" 
					}

					const user = {
						id: profile.id,
						username: profile.username,
						photo: profile.photos?.[0]?.value || "",
						email: profile.emails?.[0]?.value ?? null,
						firstname,
						lastname,
					};

					// check if the user exist
					const checkqueryfromowner = owners.findOne({email:user.email})
					const checkqueryfromuser =  users.findOne({email:user.email}) 

					// if the user already exist just no need to store the data
					if(await checkqueryfromowner){
						done(null, user) 
						return 
					}else if(await checkqueryfromuser){
						done(null, user)
						return 
					}



					const userdata = await owners.insertOne(user)
                                       if(!userdata){
						    done(null, null)
						return 
					}
					if(userdata){
						done(null, user)
						return
					}

				} catch (error) {
					console.log("error while sign in with github")
					done(error, null)
				} 

			})

	)}

