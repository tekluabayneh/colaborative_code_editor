import { Router } from "express";
import DocController from "../controllers/document.controller";
const DocumentRouter = Router();
import authorizeRoles from "../middlewares/role.middleware";
import authenticateMiddleware from "../middlewares/auth.middleware";
const { authenticate } = authenticateMiddleware;

/// get single document when user click file tree
DocumentRouter.get(
  "/doc/GetSingleDocument/:DocId",
  authenticate,
  authorizeRoles("Admin", "Owner"),
  (req, res) => DocController.GetdocumetnById(req, res)
);

DocumentRouter.post(
  "/doc/GetAllFolderTree",
  authenticate,
  authorizeRoles("Admin", "Owner"),
  (req, res) => DocController.GetAllFolderTree(req, res)
);
DocumentRouter.post(
  "/doc/GetOnlyDocument",
  authenticate,
  authorizeRoles("Admin", "Owner"),
  (req, res) => DocController.GetOnlyDocument(req, res)
);

DocumentRouter.put(
  "/doc/UpdateFolderName",
  authenticate,
  authorizeRoles("Admin", "Owner"),
  (req, res) => DocController.UpdateFolderName(req, res)
);

DocumentRouter.put(
  "/doc/updateDocumentContent",
  authenticate,
  authorizeRoles("Admin", "Owner"),
  (req, res) => DocController.UpdateDocument(req, res)
);
DocumentRouter.post(
  "/doc/createFolder",
  authenticate,
  authorizeRoles("Admin", "Owner"),
  (req, res) => DocController.createFolder(req, res)
);
DocumentRouter.post(
  "/doc/newDocument",
  authenticate,
  authorizeRoles("Admin", "Owner"),
  (req, res) => DocController.newDocument(req, res)
);
DocumentRouter.delete(
  "/doc/DeleteDocument",
  authenticate,
  authorizeRoles("Admin", "Owner"),
  (req, res) => DocController.DeletedocumentById(req, res)
);

export default DocumentRouter;
