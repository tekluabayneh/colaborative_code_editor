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
  const [isFile, setisFile] = useState(false);
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

  const DeleteFile = () => {};
  const DeleteFolder = () => {};

  const UpdateFileName = async (node: DocumentType) => {
    console.log("thsi is the node from the context to be updaed man", node);
    // const res = await axios.put("http://localhost:5000/api/doc/UpdateFolderOrFileName", {}, {withCredentials:true})
    // console.log(res)
    settoBeupdated((prev) => ({
      ...prev,
      node: node,
    }));
    setIsModalOpen(true);
  };
  const UpdateDocument = async (node: DocumentType) => {
    console.log("thsi is the node from the context to be updaed man", node);
    // const res = await axios.put("http://localhost:5000/api/doc/UpdateFolderOrFileName", {}, {withCredentials:true})
    // console.log(res)

    settoBeupdated((prev) => ({
      ...prev,
      node: node,
    }));

    setIsModalOpen(true);
  };
  const updateFileToEditor = (file: DocumentType[]) => {
    SetCurrentFileInEditor(file);
  };

  const newDocument = () => {};
  
  const SaveFileContentToDb = () => {};

  const Createfolder = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const CreateFile_and_FolderWithin = () => {
    setIsModalOpen(true);
    setisFile(isFile);
  };

  const Dletefile_and_folder = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
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
    const flag = localStorage.getItem("flag");
    function setToBeUpdatedCase() {
      if (!flag) return;
      switch (flag) {
        case "newFile":
          return "newfile man";
        case "createFolder":
          return "new folder man";
        case "Rename":
          return "renaming man";
        case "Delete":
          return "delete";
        default:
          return "nothing man";
      }
    }
  useEffect(() => {
    console.log("🔥 toBeUpdated changed:", toBeUpdated);
  }, [toBeUpdated]);
    const result = setToBeUpdatedCase();
    console.log(result);

    setIsModalOpen(false);
    setName("");
  };

  return (
    <FileTreeContent.Provider
      value={{
        name,
        setName,
        Createfolder,
        CreateFile_and_FolderWithin,
        isModalOpen,
        setIsModalOpen,
        UpdateFileName,
        CurrentFileInEditor,
        DeleteFile,
        DeleteFolder,
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
