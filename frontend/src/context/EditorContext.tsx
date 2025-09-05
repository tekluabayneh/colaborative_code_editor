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
  const [flag, setFlag] = useState("");
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

  const UpdateFileName = async ({ node }: { node: DocumentType }) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/doc/UpdateFolderName/",
        { folderId: node.folderId, newName: name },
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

  const newFile = async ({ node }: { node: DocumentType }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/doc/newDocument",
        {
          parentId: node._id,
          content: "",
          fileName: name,
          email: localStorage.getItem("email"),
          ownerType: node.ownerType,
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

  const CreateFolder = async ({ node }: { node: DocumentType }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/doc/createFolder",
        {
          parentId: node._id,
          folderName: name,
          email: localStorage.getItem("email"),
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

  const DeleteFolder = async ({ node }: { node: DocumentType }) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/doc/DeleteDocument`,
        {
          data: {
            email: localStorage.getItem("email"),
            folderId: node.folderId,
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
    settoBeupdated((prev) => ({
      ...prev,
      node: node,
    }));

    setDeleteModalOpen(false);
    setIsModalOpen(true);
  };

  const SaveFileContentToDb = () => {};

  const Createfolder = (node: DocumentType) => {
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
    setDeleteModalOpen(false);
    setIsModalOpen(true);
  };

  const deleteFolder = (node: DocumentType) => {
    settoBeupdated((prev) => ({
      ...prev,
      node: node,
    }));
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

  useEffect(() => {
    const getFlag = localStorage.getItem("flag");
    if (!getFlag) return;
    setFlag(getFlag);
  }, [flag]);

  const toUpdate = { ...toBeUpdated, name } as { node: DocumentType };
  const handleSubmit = () => {
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
          return "nothing to update";
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
        flag,
        setFlag,
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
