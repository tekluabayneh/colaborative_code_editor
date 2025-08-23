import { Response, Request } from "express";
import Document from "../models/Document";
 const GetdocumetnById = async (req:Request, res:Response) => { 

	if(!req.body.email || !req.body.documetId) { 
	    res.status(400).json({message:"documetId and email are mandatory"}) 
		 return 
	}
   const { documetId, email, } = req.body 

   const documentData =   await Document.findOne()

	res.status(200).json({message:"data is send successfully", FileName:"",FileExtenstion:"", content:""}) 

 } 
