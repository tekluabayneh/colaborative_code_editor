"use client";
import React, { createContext, ReactNode, useState, useContext } from "react";
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

  const DeleteFile = () => {};
  const DeleteFolder = () => {};

  const UpdateFileName_and_folderName = async (node: DocumentType) => {
    console.log("thsi is the node from the context to be updaed man", node);
    // const res = await axios.put("http://localhost:5000/api/doc/UpdateFolderOrFileName", {}, {withCredentials:true})
    // console.log(res)
  };

  const updateFileToEditor = (file: DocumentType[]) => {
    SetCurrentFileInEditor(file);
  };

  const SaveFileContentToDb = () => {};
  const handleSubmit = () => {
    /// if therer is not folder id in the localStorage create the file and also folder in the root level
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
    console.log("this is the name we want man", name);
    setIsModalOpen(false);
  };

  const Createfolder = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const CreateFile_and_FolderWithin = (isFile: boolean) => {
    setIsModalOpen(true);
    setisFile(isFile);
    const folderId = localStorage.getItem("folderId");
    console.log("this", folderId);
  };

  const Dletefile_and_folder = () => {};
  return (
    <FileTreeContent.Provider
      value={{
        name,
        setName,
        Createfolder,
        CreateFile_and_FolderWithin,
        isModalOpen,
        setIsModalOpen,
        UpdateFileName_and_folderName,
        CurrentFileInEditor,
        DeleteFile,
        DeleteFolder,
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
