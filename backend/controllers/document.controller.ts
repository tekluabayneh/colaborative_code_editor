import { Response, Request } from "express";
import Documents from "../models/Document";
import validator from "../Utils/validator"
import Owners from "../models/Owners";
import FolderTree, { INode } from "../models/FolderStuture";
import { Types } from "mongoose";

type ObId = Types.ObjectId

interface folderToBeDeletedTypes{ 
	_id:string, 
	name:string,
	folderId:string,
	contentId: ObId | null,
	ownerType:string ,
	ownerId:string, 
	parentId:string,
       nodes:folderToBeDeletedTypes[]
} 



async function getSubtree(folderId: string): Promise<folderToBeDeletedTypes | null> {
	const root = await FolderTree.findOne({"folderId":folderId}).lean();
	if (!root) return null;

	async function fetchChildren(node: INode): Promise<INode> {
		const children = await FolderTree.find({ parentId: node._id }).lean();
		//@ts-ignore 
		node.nodes = [];

		for (const child of children) {
			const childWithDescendants = await fetchChildren(child);
			//@ts-ignore 
			node.nodes.push(childWithDescendants);
		}

		return node;

	}
	// @ts-ignore
	return fetchChildren(root);
}

const GetAllOwnerFolderTree =  async (req:Request, res:Response) => { 
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

	return fileTree
} 


class DocumentController { 


	// ======================================//////=====================================
	async GetAllFolderTree (req:Request, res:Response): Promise<void> { 
		if(!req.body.email){ 
			res.status(400).json({message:"email is mandatory"}) 
			return
		} 
		try {	
			// now get all the folder tree taht are labed with ownder id  
			const fileTree = await  GetAllOwnerFolderTree(req, res)

			if(!fileTree){ 
				res.status(404).json({ message: "folder tree are not found" });	
				return 
			}

			const result  = await getSubtree(fileTree[0].folderId)
			res.send([result])
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });	
		}
	}


	// ======================================//////=====================================
	async GetdocumetnById (req:Request, res:Response):Promise<void> { 
		if(!req.params.DocId) { 
			res.status(400).json({message:"documetId is mandatory"}) 
			return 
		}

		try {
			const { DocId } = req.params as {DocId:string} 

			const documentData = await Documents.findById(DocId)

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


	// ======================================//////=====================================
	async DeletedocumentById(req:Request, res:Response):Promise<void>{ 
		if(!req.params.folderId || !req.body.email){ 
			res.status(404).json({ message: "folder id and email  are required" });
			return 
		} 

		type oneTy = { 
			folderId:string,
		} 

		const {folderId} = req.params as {folderId:string} satisfies oneTy
		try {
			const docs = await  FolderTree.find({folderId:folderId})

			const folderToBeDeleted = await getSubtree(folderId)
			if(!folderToBeDeleted){ 
			res.status(500).json({ message: "folders are not found" });
				return 
			} 
                        const IDS:ObId[] = [] 
                        const FolderIDS:string[] = []

                         // collect contentId to be deleted  
			 function  collectIds(items:folderToBeDeletedTypes) { 
				  if(items.contentId) IDS.push(items?.contentId)
				  FolderIDS.push(items.folderId)
				if(items.nodes && items.nodes.length > 0){ 
				 for(let ids of items.nodes){ 
                                        collectIds(ids) 
				} 
			} 
			} 
                         
		      collectIds(folderToBeDeleted)
                     
                    for(let id of IDS){ 
                   await Documents.deleteOne({_id:id})
		    }

                    for(let id of FolderIDS){ 
			   await FolderTree.deleteOne({folderId:id})
		    }  

			res.send({do:docs, result:folderToBeDeleted, ids:IDS, folder:FolderIDS}) 

		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	} 

	// ======================================//////=====================================
	async UpdateFolder_or_file_name(req:Request, res:Response): Promise<void> { 
		if(!req.body.folderId ||  !req.body.newContent || req.body.isFolder === undefined || !req.body.DocId ){ 
			res.status(400).json({ message: "all input are mandatory"});
			return 
		} 
		type oneTy = { 
			DocId:string,
			folderId:string, 
			isFolder:boolean,
			newContent:string

		} 

		try {
			const {DocId, folderId, newContent, isFolder} = req.body as {DocId:string, newContent:string, folderId:string,  isFolder:boolean} satisfies oneTy

			// if the update is only folder name  
			if(isFolder){ 
				const findFolder = await FolderTree.findOne({folderId:folderId}) 

				if(!findFolder){ 
					res.status(400).json({ message: "folder is not found"});
					return 
				} 
                               
				findFolder.name = newContent 
				findFolder.save()

				res.status(400).json({ message: "folder name is updated", findFolder});
				return 


			} 
                        
			const documentData = await Documents.findById(DocId)

			if(!documentData){ 
				res.status(400).json({message:"documetId is not found"}) 
				return 
			} 


		       documentData.content =  newContent	
                      documentData.save()


			res.status(500).json({ message: "wored success" });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	} 

}

const DocController = new DocumentController() 

export default DocController 



