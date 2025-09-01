import { Router } from "express";
import  DocController from "../controllers/document.controller"
const DocumentRouter = Router()
import  authorizeRoles from "../middlewares/role.middleware"   
import  authenticateMiddleware from "../middlewares/auth.middleware"
const {authenticate} = authenticateMiddleware 

/// get single document when user click file tree
DocumentRouter.get("/doc/GetSingleDocument/:DocId", authenticate, authorizeRoles("Admin","Owner"), (req, res) => DocController.GetdocumetnById(req, res))

DocumentRouter.post("/doc/GetAllFolderTree", authenticate, authorizeRoles("Admin","Owner"),(req, res) => DocController.GetAllFolderTree(req, res))

DocumentRouter.put("/doc/UpdateFolderOrFileName", authenticate, authorizeRoles("Admin","Owner"),(req, res) => DocController.UpdateFolder_or_file_name(req, res))

DocumentRouter.delete("/doc/DeleteDocument/:folderId", authenticate, authorizeRoles("Admin","Owner"),(req, res) => DocController.DeletedocumentById(req, res))



export default DocumentRouter
