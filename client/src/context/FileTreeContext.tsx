"use client"
import React, {createContext, ReactNode, useContext, useState } from "react";
import { fileTree as intialTree } from "@/data/FolderTree";
import { toast } from "react-hot-toast";
import { Node } from "@/types/Node";
const generateId = () => crypto.randomUUID();
type FileSystemContextType = {
    name: string;
    setName: (value: string) => void;
    isModabolen: boolean;
    setisModalopen: (value: boolean) => void;
    isFile: boolean;
    setisFile: (value: boolean) => void;
    fileTree: Node[];
    setFileTree: React.Dispatch<React.SetStateAction<Node[]>>;
    handleSubmit: () => void;
    handleCancel: () => void;
    CreateFolder_andFile: (node: Node, e: MouseEvent) => void;
    leftClick: (e: MouseEvent) => void;
    Createfolder : () => void;
    CreateFile_and_FolderWithin:(isFile:boolean) => void
     Dletefile_and_folder: () => void

};

const FileSystemContext = createContext<FileSystemContextType | null>(null);

export const  FileSystemProvider =({children}:{children:ReactNode}) => {
    const [name, setName] = useState("");
    const [isModabolen, setisModalopen] = useState(false)
    const [isFile, setisFile] = useState(false)
    const [fileTree, setFileTree] = useState<Node[]>(intialTree);

    const handleSubmit = () => {
        const newFolder:Node= {
            folderid:generateId(),
            name: name,
            nodes: [],

        }
        const newFile:Node = {
            name:name 
        }

        if(newFolder.name === "" || newFile.name === ""){

            toast("Please enter a folder or file name.", {
                icon: "⚠️",
                style: {
                    background: "#fef3c7",
                    color: "#92400e",
                },
            });
            return 
        }

        setFileTree((prev:Node[]) => [...prev, isFile ? newFile : newFolder])
        setisModalopen(false)
        setName("")

    }

    const Createfolder = () =>{
        setisModalopen(true)
    }

    const handleCancel= () => {
        setisModalopen(false)
    }


    const CreateFolder_andFile =((node:Node, e:React.MouseEvent) => {
        e.preventDefault()
        localStorage.setItem("folderId", JSON.stringify(node.folderid!))
        console.log(localStorage.getItem("folderId"))
        console.log('Right click', node.folderid);
        setisModalopen(true)
    })

    const leftClick =(( e:React.MouseEvent) => {
        e.preventDefault()
        console.log('Right click');
    })

      const  CreateFile_and_FolderWithin = (isFile:boolean) => {
             setisModalopen(true)
              setisFile(isFile)
        const folderId = localStorage.getItem("folderId")
        console.log("this",folderId)
       }

 const    Dletefile_and_folder = () => {}

    return (
        <FileSystemContext.Provider
            value={{
                name,
                setName,
                isModabolen,
                setisModalopen,
                isFile,
                setisFile,
                fileTree,
                Createfolder ,
                setFileTree,
                handleSubmit,
                handleCancel,
                CreateFolder_andFile,
                leftClick,
                CreateFile_and_FolderWithin,
               Dletefile_and_folder
            }}
        >
            {children}
        </FileSystemContext.Provider> 
    )

}
export const useFileSystem = () =>{ 
    const context = useContext(FileSystemContext)
    if(!context) throw new Error("useFileSystem must be used within a FileSystemProvider");
    return context

}
