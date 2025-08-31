"use client"
import React, {createContext, ReactNode, useContext, useState , useEffect} from "react";
import { toast } from "react-hot-toast";
import { Node , FileSystemContextType } from "@/types/Node";
import axios from "axios";
const generateId = () => crypto.randomUUID();
const FileSystemContext = createContext<FileSystemContextType | null>(null);

export const  FileSystemProvider =({children}:{children:ReactNode}) => {

    const [name, setName] = useState("");
    const [isModabolen, setisModalopen] = useState(false)
    const [isFile, setisFile] = useState(false)
    const [fileTree, setFileTree] = useState<Node[]>();
    const email = "fake@gmail.com" 

useEffect(() => {
  const handleFetchFileTree = async (email: string) => {
  try {
    const response = await axios.post("http://localhost:5000/api/doc/GetAllFolderTree", {
      email: email},{ withCredentials: true});
     setFileTree(response.data)
    console.log(fileTree);
  } catch (err) {
    console.error("Error fetching file tree:", err);
  }

}
handleFetchFileTree(email)
},[email])



useEffect(() => {
  console.log("✅ File Tree Updated", JSON.stringify(fileTree, null, 2));
}, [fileTree]) ;

    const handleSubmit = () => {
        const FolderId:string | null = localStorage.getItem("folderId")

        const newFolder:Node= {
            folderid:generateId(),
            name: name,
            nodes: [],

        }

        const newFile:Node = {
            name:name 
        }

        /// if therer is not folder id in the localStorage create the file and also folder in the root level
            if(name == ""){
                toast("Please enter a folder or file name.", {
                    icon: "⚠️",
                    style: {
                        background: "#fef3c7",
                        color: "#92400e",
                    },
                });
                return 
            }


    const addToTree = (nodes: Node[]): Node[] => {
            console.log(FolderId)
        return nodes.map(node => {
            if (node.folderid  === FolderId) {
                    if(node.nodes && node.nodes?.length >  0 ){
                return {
                    ...node,
                    nodes: [...node.nodes, isFile ? newFile : newFolder]
                };
            }
                }else if(node.nodes && node.nodes.length == 0){
                    return {
                        ...node,
                        nodes:[isFile ? newFile : newFolder]
                } }


  
            if (node.nodes && node.nodes.length >0 ) {
                return {
                    ...node,
                    nodes: addToTree(node.nodes)
                };
            }

            return node;
        });
    };


        if(!FolderId){
            setFileTree((prev:Node[]) => [...prev, isFile ? newFile : newFolder])
            setisModalopen(false)
            setName("")
            console.log("file are root level")
            return 
        }else{
        // Add to nested folder
         setFileTree(prev =>  addToTree(prev))
            setisModalopen(false)
            setName("")
        console.log("📁 Created in nested folder")

    setTimeout(() => {
        localStorage.setItem("folderId","")
        },900)
        }
    }




    const Createfolder = () =>{
        setisModalopen(true)
    }

    const handleCancel= () => {
        setisModalopen(false)
    }

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
