import { Response, Request } from "express";
import Documents from "../models/Document";
import FolderTree from "../models/FolderStuture";
import validator from "../Utils/validator"
import Owners from "../models/Owners";

interface DocumentType{ 
	_id:string, 
	name:string,
	folderId:string,
	contentId: string | null,
	ownerType:string ,
	ownerId:string, 
	nodes?:DocumentType[]
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


	// async DeletedocumentById(req: Request, res: Response): Promise<void> {
	// 	const { folderId } = req.params as { folderId: string };
	// 	const { email } = req.body;
	//
	// 	if (!folderId || !email) {
	// 		res.status(404).json({ message: "folderId and email are required" });
	// 		return;
	// 	}
	//
	// 	try {
	// 		// Collect IDs of documents to be deleted
	// 		const Ides: string[] = [];
	//
	// 		// Get the full folder tree for this owner
	// 		const AllfileTree = await GetAllOwnerFolderTree(req, res);
	//
	// 		if (!AllfileTree || AllfileTree.length === 0) {
	// 			res.status(404).json({ message: "folder tree not found" });
	// 			return;
	// 		}
	//
	// 		// Recursive function to find and delete folder nodes
	// 		function deleteFolder(nodes: DocumentType[], folderId: string): DocumentType[] {
	// 			return nodes.filter(node => {
	// 				if (node.folderId === folderId) return false; // remove this node
	// 				if (node.nodes) node.nodes = deleteFolder(node.nodes, folderId);
	// 				return true;
	// 			});
	// 		}
	//
	// 		// Recursive function to collect all content IDs in a folder
	// 		function collectContentIds(nodes?: DocumentType[]) {
	// 			if (!nodes) return;
	// 			for (const node of nodes) {
	// 				if (node.contentId) Ides.push(node.contentId);
	// 				if (node.nodes) collectContentIds(node.nodes);
	// 			}
	// 		}
	//
	// 		// Traverse all root folders
	// 		for (const root of AllfileTree) {
	// 			// @ts-ignore
	// 			if (!root || !root.nodes) continue;
	//
	// 			// Collect content IDs from the folder to delete
	// 			// @ts-ignore 
	// 			const folderToDelete = root.nodes.find(node => node.folderId === folderId) || null;
	// 			if (folderToDelete) collectContentIds([folderToDelete]);
	//
	// 			// Remove the folder from the tree
	// 			// root.nodes = deleteFolder(root.nodes, folderId);
	//
	// 			// Update the root document in MongoDB
	// 			// await FolderTree.updateOne( { _id: root._id }, { $set: { nodes: root.nodes } });
	// 		}
	//
	// 		console.log("Collected content IDs:", Ides);
	//
	// 		// Delete all documents corresponding to collected content IDs
	// 		for (const contentId of Ides) {
	// 			if (contentId !== "null") {
	// 				await Documents.deleteOne({ contentId });
	// 			}
	// 		}
	//
	// 		// Delete the folder itself if it’s a root folder
	// 		// await FolderTree.deleteOne({ folderId });
	//
	// 		res.status(200).json({ message: "Folder and nested documents deleted successfully" });
	// 	} catch (error) {
	// 		console.error(error);
	// 		res.status(500).json({ message: "Internal server error" });
	// 	}
	// }




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


	               // collect ids of document to be delted
	               const Ides:string[] = [] 
		const AllfileTree =  await GetAllOwnerFolderTree(req, res)
	               let findFileById:DocumentType[] | null 

	                       if(!AllfileTree){ 
				res.status(404).json({ message: "folder tree are not found" });	
				return 
				} 

			//
			// function deleteFolder(nodes: DocumentType[], folderId: string): DocumentType[] {
			//   return nodes.filter(node => {
			//     if (node.folderId === folderId) return false;
			//     if (node.nodes) node.nodes = deleteFolder(node.nodes, folderId);
			//     return true;
			//   });
			// }
			//
			//                             for (const root of AllfileTree) {
			// 	if(!root && !root.nodes) return 
			//
			//                             root.nodes = deleteFolder(root.nodes, folderId);
			//                             await FolderTree.deleteOne({ _id: root._id }, { $set: { nodes: root.nodes } });
			//
			//  // @ts-expect-error thsi is error
			//          findFileById = await FolderTree.find({folderId:folderId}).lean<DocumentType>()
			//
			// }
			//

				 // @ts-expect-error thsi is error
			         findFileById = await FolderTree.find({folderId:folderId}).lean<DocumentType>()

			 // iterate over folders and get all the document of id  to be delted
			 const getDocumenId = (nodes?:DocumentType[]) => { 
				if(!nodes) return 
				for(let node of nodes){ 
				        Ides.push(node.contentId ?? "null") 
				       if(node.nodes && node.nodes.length > 0){ 
						getDocumenId(node.nodes)
				}} 
			} 

			if(!findFileById){ 
				res.status(404).json({ message: "file or fodler are not found " });
			   return 
			} 

			getDocumenId(findFileById)

			console.log("contentId",Ides)  
			console.log("folderId",findFileById)  

			// this is response is for debug 
			res.send({folder:findFileById, "and this is the intire folder":AllfileTree}) 

				//   for(let ids of Ides){ 
				// await  Documents.deleteOne({folderId:ids})
				// } 

	        // delte the folder by its id since we are delting the folder it will also delte nested child file
	                             await FolderTree.deleteOne({folderId:folderId}) 
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



