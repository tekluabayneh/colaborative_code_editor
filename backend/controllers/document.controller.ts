import { Response, Request } from "express";
import Documents from "../models/Document";
import FolderTree from "../models/FolderStuture";
import validator from "../Utils/validator"
import Owners from "../models/Owners";


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
				res.status(404).json({message:"user is not found"})
				return 
			} 

			// if the user is is not Owner get his owner id and fetch its folder tree 
			let findOwnerId 
			if(IsRoleUser.role !== "Owner"){ 
				const invitedBy = IsRoleUser.users_user?.invitedBy
				findOwnerId = await Owners.findOne({_id:invitedBy})   
			}else{ 
				findOwnerId = IsRoleUser?.Owners_user?._id 
			}

			// now get all the folder tree taht are labed with ownder id  
			const fileTree = await FolderTree.find({"ownerId":findOwnerId}) 

			res.send(fileTree)
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });	
		}
	}


	async GetdocumetnById (req:Request, res:Response):Promise<void> { 
		if(!req.params.DocId) { 
			res.status(400).json({message:"documetId is mandatory"}) 
			return 
		}

		try {
			const { DocId } = req.query as {DocId:string} 
			const documentData =   await Documents.findOne({"contentId":DocId})
			if(!documentData){ 
				res.status(400).json({message:"documetId is not found"}) 
				return 
			}

			const data = {ownerId:documentData.ownerId, FileExtenstion:documentData.language, content:documentData.content}
			res.status(200).json({message:"data is send successfully",data}) 

		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}

	}



	async DeletedocumentById(req:Request, res:Response):Promise<void>{ 
		try {

		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	} 

	async UpdatedocumentById(req:Request, res:Response):Promise<void>{ 

		try {

		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	} 


	async UpdateFolder_or_file_name(req:Request, res:Response): Promise<void> { 
		if(!req.body.folderId || !req.body.newName){ 
			res.status(400).json({ message: "folder id is mandatory"});
			return 
		} 

		try {
			const {folderId, newName} = req.body

			const findFolder = await FolderTree.findOne({folderId:folderId}) 

			if(!findFolder){ 
				res.status(400).json({ message: "folder is not found"});
				return 
			} 

			folderId.name = newName 
			findFolder.save()

		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	} 

}

const DocController = new DocumentController() 

export default DocController 



