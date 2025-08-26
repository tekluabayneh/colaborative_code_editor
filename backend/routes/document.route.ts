import { Router } from "express";
import  DocController from "../controllers/document.controller"

const DocumentRouter = Router()

/// get single document when user click file tree
DocumentRouter.post("/doc/GetSingleDocument:DocId", (req, res) => DocController.GetdocumetnById(req, res))

DocumentRouter.get("/doc/GetAllFolderTree", (req, res) => DocController.GetAllFolderTree(req, res))


export default DocumentRouter
