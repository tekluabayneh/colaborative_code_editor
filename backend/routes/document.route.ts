import { Router } from "express";
import  DocController from "../controllers/document.controller"

const DocumentRouter = Router()

/// get single document when user click file tree
DocumentRouter.get("/doc/GetSingleDocument/:DocId", (req, res) => DocController.GetdocumetnById(req, res))

DocumentRouter.post("/doc/GetAllFolderTree", (req, res) => DocController.GetAllFolderTree(req, res))

DocumentRouter.put("/doc/UpdateFolderOrFileName", (req, res) => DocController.UpdateFolder_or_file_name(req, res))

DocumentRouter.delete("/doc/DeleteDocument/:folderId", (req, res) => DocController.DeletedocumentById(req, res))

// DocumentRouter.put("/doc/UpdateDocument/:DocId", (req, res) => DocController.UpdatedocumentById(req, res))


export default DocumentRouter
