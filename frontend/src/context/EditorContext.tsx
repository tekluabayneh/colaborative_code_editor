"use client";
import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { DocumentType, FileSyncHandeleContentType } from "../types/document";
import axios from "axios";
const FileTreeContent = createContext<FileSyncHandeleContentType | null>(null);
import toast from "react-hot-toast";
export const FileContentProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [CurrentFileInEditor, SetCurrentFileInEditor] = useState<
    DocumentType[] | null
  >(null);
  type nodes = {
    node: DocumentType | [];
    name: string;
  };

  const [toBeUpdated, settoBeupdated] = useState<nodes>({
    node: [],
    name: "",
  });

  const UpdateFileName = async (node: DocumentType) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/doc/UpdateFolderName/",
        { folderId: node.node.folderId, newName: node.name },
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        toast.error(message);
      }
    }
  };

  const UpdateDocument = async (node: DocumentType) => {
    console.log("thsi is the node from the context to be updated man", node);
    // const res = await axios.put("http://localhost:5000/api/doc/UpdateFolderOrFileName", {}, {withCredentials:true})
    // console.log(res)
  };

  const newFile = async (node: DocumentType) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/doc/newDocument",
        {
          parentId: node.node._id,
          content: "",
          fileName: node.name,
          ownerId: node.node.ownerId,
          ownerType: node.node.ownerType,
        },
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        toast.error(message);
      }
    }
  };

  const CreateFolder = async (node: DocumentType) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/doc/createFolder",
        {
          parentId: node.node._id,
          folderName: node.name,
          ownerId: node.node.ownerId,
        },
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        toast.error(message);
      }
    }
  };

  const DeleteFolder = async (node: DocumentType) => {
    try {
      console.log("man man man", node);
      const res = await axios.delete(
        `http://localhost:5000/api/doc/DeleteDocument`,
        {
          data: {
            email: localStorage.getItem("email"),
            folderId: node.node.folderId,
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        toast.error(message);
      }
    }
  };

  const updateFileToEditor = (file: DocumentType[]) => {
    SetCurrentFileInEditor(file);
  };

  const newDocument = (node: DocumentType) => {
    console.log("new document man", node);

    settoBeupdated((prev) => ({
      ...prev,
      node: node,
    }));

    setDeleteModalOpen(false);
    setIsModalOpen(true);
  };

  const SaveFileContentToDb = () => {};

  const Createfolder = (node: DocumentType) => {
    console.log("new folder", node);

    settoBeupdated((prev) => ({
      ...prev,
      node: node,
    }));

    setDeleteModalOpen(false);
    setIsModalOpen(true);
  };

  const handelFolderNam_rename = (node: DocumentType) => {
    settoBeupdated((prev) => ({
      ...prev,
      node: node,
    }));
    console.log("this work but ugly", node);
    setDeleteModalOpen(false);
    setIsModalOpen(true);
  };
  const deleteFolder = (node: DocumentType) => {
    settoBeupdated((prev) => ({
      ...prev,
      node: node,
    }));
    console.log("this work but ugly", node);
    setIsModalOpen(true);
    setDeleteModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const Dletefile_and_folder = () => {
    setIsModalOpen(true);
    setDeleteModalOpen(false);
  };

  const handleSubmit = () => {
    const flag = localStorage.getItem("flag");

    const toUpdate = { ...toBeUpdated, name };
    function setToBeUpdatedCase() {
      if (!flag) return;
      switch (flag) {
        case "newFile":
          newFile(toUpdate);
          break;
        case "createFolder":
          CreateFolder(toUpdate);
          break;
        case "Rename":
          UpdateFileName(toUpdate);
          break;
        case "Delete":
          DeleteFolder(toUpdate);
          break;
        default:
          return "nothing man";
      }
    }

    if (flag === "Delete") {
      setToBeUpdatedCase();
      setIsModalOpen(false);
      return;
    }
    if (name == "") {
      toast("Please enter a folder or file name.", {
        icon: "⚠️",
        style: {
          background: "#fef3c7",
          color: "#92400e",
        },
      });
      return;
    }

    settoBeupdated((prev) => ({
      ...prev,
      name: name,
    }));
    setToBeUpdatedCase();
    setIsModalOpen(false);
    setName("");
  };
  return (
    <FileTreeContent.Provider
      value={{
        name,
        setName,
        Createfolder,
        isModalOpen,
        setIsModalOpen,
        newDocument,
        CurrentFileInEditor,
        deleteFolder,
        handelFolderNam_rename,
        deleteModalOpen,
        UpdateDocument,
        Dletefile_and_folder,
        updateFileToEditor,
        SaveFileContentToDb,
        handleSubmit,
        handleCancel,
      }}
    >
      {children}
    </FileTreeContent.Provider>
  );
};
export const useFileTree = () => {
  const context = useContext(FileTreeContent);
  if (!context)
    throw new Error("useFileSystem must be used within a FileSystemProvider");
  return context;
};
