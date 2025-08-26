import { Response, Request } from "express";
import Documents from "../models/Document";
import FolderTree from "../models/FolderStuture";
import validator from "../Utils/validator"


class DocumentController { 



	async GetAllFolderTree (req:Request, res:Response): Promise<void> { 
		if(!req.body.email){ 
			res.status(400).json({message:"email is mandatory"}) 
			return
		} 
		try {
			const {email} = req.body as {email:string} 

			const IsRoleUser = await validator.isUserRoleOwnerOrUser(email)     

			// check if the user is found 
			if(!IsRoleUser){ 
				res.status(400).json({message:"user is not found"})
				return 
			} 


			// if the user is is not Owner get his owner id and fetch its folder tree 

			if(IsRoleUser.role !== "Owner"){ 
				// get the invited by field herer invitedBy

				res.send("use is nto ownder")
				return 

			}
			await FolderTree.insertOne({"name": "Home", "folderId": "uuid-home", "ownerType": "Owner", "ownerId": "PLACEHOLDER_OWNER_ID", "nodes": []}) 
			res.send(IsRoleUser) // get the user email and check its role first and if the user is user get the owner it its owner get folder tree that are related to it and send them 

		} catch (error) {
			res.send(error)		
			console.log(error)
		}
	}


		async GetdocumetnById (req:Request, res:Response):Promise<void> { 

			if(!req.body.email || !req.body.documetId) { 
				res.status(400).json({message:"documetId and email are mandatory"}) 
				return 
			}
			try {
				const { documetId, email, } = req.body as {email:string, documetId:string} 

				const documentData =   await Documents.findOne({email:email})

				res.status(200).json({message:"data is send successfully", FileName:"",FileExtenstion:"", content:""}) 

			} catch (error) {

			}

		}

}

	const DocController = new DocumentController() 

	export default DocController 
