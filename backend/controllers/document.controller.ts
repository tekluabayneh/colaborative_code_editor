import { Response, Request } from "express";
import Documents from "../models/Document";
import validator from "../Utils/validator";
import Owners from "../models/Owners";
import FolderTree, { INode } from "../models/FolderStuture";
import { Types } from "mongoose";
import { nanoid } from "nanoid";
type ObId = Types.ObjectId;

interface folderToBeDeletedTypes {
  _id: string;
  name: string;
  folderId: string;
  contentId: ObId | null;
  ownerType: string;
  ownerId: string;
  parentId: string;
  nodes: folderToBeDeletedTypes[];
}

async function getSubtree(
  folderId: string
): Promise<folderToBeDeletedTypes | null> {
  const root = await FolderTree.findOne({ folderId: folderId }).lean();
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

const GetAllOwnerFolderTree = async (req: Request, res: Response) => {
  const { email } = req.body as { email: string };

  const IsRoleUser = await validator.isUserRoleOwnerOrUser(email);

  // check if the user is found
  if (!IsRoleUser) {
    res.status(404).json({ message: "user is not found" });
    return;
  }

  // if the user is is not Owner get his owner id and fetch its folder tree
  let findOwnerId;
  if (IsRoleUser.role !== "Owner") {
    const invitedBy = IsRoleUser.users_user?.invitedBy;
    findOwnerId = await Owners.findOne({ _id: invitedBy });
  } else {
    findOwnerId = IsRoleUser?.Owners_user?._id;
  }

  // now get all the folder tree taht are labed with ownder id
  const fileTree = await FolderTree.find({ ownerId: findOwnerId });

  return fileTree;
};

class DocumentController {
  // ======================================//////=====================================
  async GetAllFolderTree(req: Request, res: Response): Promise<void> {
    if (!req.body.email) {
      res.status(400).json({ message: "email is mandatory" });
      return;
    }
    try {
      // now get all the folder tree taht are labed with ownder id
      const fileTree = await GetAllOwnerFolderTree(req, res);

      if (!fileTree) {
        res.status(404).json({ message: "folder tree are not found" });
        return;
      }
      console.log(fileTree);

      const result = await getSubtree(fileTree[0]?.folderId);
      res.send([result]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // ======================================//////=====================================
  async GetdocumetnById(req: Request, res: Response): Promise<void> {
    if (!req.params.DocId) {
      res.status(400).json({ message: "documetId is mandatory" });
      return;
    }

    try {
      const { DocId } = req.params as { DocId: string };

      const documentData = await Documents.findById(DocId);

      if (!documentData) {
        res.status(400).json({ message: "documetId is not found" });
        return;
      }

      const data = {
        ownerId: documentData.ownerId,
        FileExtenstion: documentData.language,
        content: documentData.content,
      };
      res.status(200).json({ message: "data is send successfully", data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // ======================================//////=====================================
  async DeletedocumentById(req: Request, res: Response): Promise<void> {
    if (!req.body.folderId || !req.body.email) {
      res.status(404).json({ message: "folder id and email  are required" });
      return;
    }

    type oneTy = {
      folderId: string;
    };

    const { folderId } = req.body as { folderId: string } satisfies oneTy;

    try {
      const docs = await FolderTree.find({ folderId: folderId });

      const folderToBeDeleted = await getSubtree(folderId);
      if (!folderToBeDeleted) {
        res.status(500).json({ message: "folders are not found" });
        return;
      }
      const IDS: ObId[] = [];
      const FolderIDS: string[] = [];

      // collect contentId to be deleted
      function collectIds(items: folderToBeDeletedTypes) {
        if (items.contentId) IDS.push(items?.contentId);
        FolderIDS.push(items.folderId);
        if (items.nodes && items.nodes.length > 0) {
          for (let ids of items.nodes) {
            collectIds(ids);
          }
        }
      }

      collectIds(folderToBeDeleted);

      for (let id of IDS) {
        await Documents.deleteOne({ _id: id });
      }

      for (let id of FolderIDS) {
        await FolderTree.deleteOne({ folderId: id });
      }

      res.status(200).json({ message: "document and file are deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // ======================================//////=====================================
  async UpdateFolderName(req: Request, res: Response): Promise<void> {
    if (!req.body.folderId || !req.body.newName) {
      res.status(400).json({ message: "all input are mandatory" });
      return;
    }
    type oneTy = {
      folderId: string;
      newName: string;
    };

    try {
      const { folderId, newName } = req.body as {
        newName: string;
        folderId: string;
      } satisfies oneTy;

      // if the update is only folder name
      const findFolder = await FolderTree.findOne({ folderId: folderId });

      if (!findFolder) {
        res.status(400).json({ message: "folder is not found" });
        return;
      }

      if (findFolder.contentId == null) {
        findFolder.name = newName;
        findFolder.save();

        res.status(200).json({ message: "folder name is updated" });
        return;
      }
      const contentName = await Documents.findOne({
        _id: findFolder.contentId,
      });
      console.log("this man", contentName);

      if (!contentName) return;

      findFolder.name = newName;
      contentName.language = newName;

      findFolder.save();
      contentName.save();
      res.status(200).json({ message: "folder and content name is updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // ======================================//////=====================================
  async UpdateDocument(req: Request, res: Response): Promise<void> {
    if (!req.body.newContent || !req.body.contentId) {
      res
        .status(400)
        .json({ message: "all content and contentId are mandatory" });
      return;
    }
    const { contentId, newContent } = req.body;
    try {
      const documentData = await Documents.findById(contentId);

      if (!documentData) {
        res.status(400).json({ message: "documetId is not found" });
        return;
      }

      documentData.content = newContent;
      documentData.save();

      res.status(200).json({ message: "document updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async createFolder(req: Request, res: Response): Promise<void> {
    if (!req.body.folderName || !("parentId" in req.body) || !req.body.email) {
      res.status(400).json({ message: "all input are mandatory" });
      return;
    }
    try {
      const folderid = nanoid(12);
      const { parentId, folderName, email } = req.body;

      const getOwnerId = await Owners.findOne({ email: email });

      if (!getOwnerId) {
        res
          .status(400)
          .json({ message: "owner was not found when creating folder" });
        return;
      }

      const data = {
        contentId: null,
        folderId: folderid,
        name: folderName,
        parentId: parentId ?? null,
        ownerType: getOwnerId.role,
        ownerId: getOwnerId._id,
      };
      const createFolder = await FolderTree.insertOne(data);
      if (!createFolder) {
        res.status(500).json({ message: "folder was not  created " });
        return;
      }
      res.status(200).json({ message: "folder was created " });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // ======================================//////=====================================
  async newDocument(req: Request, res: Response): Promise<void> {
    if (
      !("content" in req.body) ||
      !("parentId" in req.body) ||
      !req.body.fileName ||
      !req.body.ownerType ||
      !req.body.email
    ) {
      res.status(400).json({ message: "all input are mandatory" });
      return;
    }

    type bodyType = {
      parentId: string;
      content: any;
      fileName: string;
      email: string;
      ownerType: string;
    };
    const folderid = nanoid(12);
    const { parentId, content, fileName, email, ownerType } =
      req.body as bodyType;
    const getOwnerId = await Owners.findOne({ email: email });

    if (!getOwnerId) {
      res
        .status(400)
        .json({ message: "owner was not found when creating file" });
      return;
    }

    const data = {
      parentId,
      content,
      fileName,
      ownerId: getOwnerId._id,
      ownerType,
    };
    const CreateDocument = await Documents.insertOne(data);

    if (!CreateDocument) {
      res.status(400).json({ message: "file was not created" });
      return;
    }

    const data_toFolder = {
      contentId: CreateDocument._id,
      folderId: folderid,
      name: fileName,
      parentId: parentId ?? null,
      ownerType: getOwnerId.role,
      ownerId: getOwnerId._id,
    };
    const createFolder = await FolderTree.insertOne(data_toFolder);
    if (!createFolder) {
      res.status(500).json({ message: "folder was not  created " });
      return;
    }
    res.send({ message: "document creation was successful" });
  }
}

const DocController = new DocumentController();

export default DocController;
