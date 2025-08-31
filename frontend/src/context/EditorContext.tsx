"use client"
import React, {createContext, ReactNode,useState, useContext} from "react";
import { DocumentType, FileSyncHandeleContentType } from "../types/document";

const FileTreeContent = createContext<FileSyncHandeleContentType | null>(null);

export const  FileContentProvider =({children}:{children:ReactNode}) => {
 const [CurrentFileInEditor, SetCurrentFileInEditor] = useState<DocumentType[] | null>(null)


  const DeleteFile = () => {}
  const DeleteFolder = () => {}

  const updateFileToEditor = (file:DocumentType[]) => {
	 SetCurrentFileInEditor(file) 
	} 


  const SaveFileContentToDb = () =>{ } 

    return (
        <FileTreeContent.Provider value={{ CurrentFileInEditor, DeleteFile, DeleteFolder,updateFileToEditor, SaveFileContentToDb}} > {children}
        </FileTreeContent.Provider> 
    )

}
export const useFileTree = () =>{ 
    const context = useContext(FileTreeContent)
    if(!context) throw new Error("useFileSystem must be used within a FileSystemProvider");
    return context

}
