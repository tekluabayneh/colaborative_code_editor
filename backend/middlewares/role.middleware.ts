import { Request, Response, NextFunction } from "express";


const authorizeRoles = (...role:string[]) => {
	return (req:Request ,res:Response, next:NextFunction) => {

		if(req.user && !req.user.role){ 
			res.status(401).json({ message: "Not authenticated" });
			return
		}

		if(!role.includes(req.user.role)){
			res.status(403).json({ message: "Forbidden: insufficient role" });
			return
		}

		next()
	} 
} 


export default authorizeRoles 

