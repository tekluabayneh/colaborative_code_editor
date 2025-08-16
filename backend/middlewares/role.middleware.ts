import { Request, Response, NextFunction } from "express";


const authorizeRoles = (...role:string[]) => {
	return (req:Request ,res:Response, next:NextFunction) => {
		try {
				if(!req.token){ 
			res.status(401).json({ message: "Not authenticated" });
			return
		}
             console.log("log from authorizeRoles",req.token)
		if(!role.includes(req.token.role)){
                  console.log("problem here",req.token)
			res.status(403).json({ message: "Forbidden: insufficient role" });
			return
		}

		next()
		} catch (error) { 
		console.log(error)
		}

	} 
} 


export default authorizeRoles 

