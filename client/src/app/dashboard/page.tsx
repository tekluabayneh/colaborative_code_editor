"use client"
import React from "react";
import { FilePlus, FolderPlus } from 'lucide-react';
import { ChatSidebar } from "@/components/ChatBar";
import CodeEditor from  "../../components/Editor"
import FileSystem from "@/components/FileSystem";
import { Toaster } from "react-hot-toast";
import NameInputModal from "../../components/ui/CreateFolderModal" 
import { useFileSystem } from "@/context/FileTreeContext";
const Home = () => {

const { isModabolen, setisFile , Createfolder ,fileTree}  = useFileSystem()

return (
        <div className="w-full flex justify-center items-center h-screen relative">
<Toaster />
            {/* this is the folder and file tree  */}
            <div className={`h-screen w-40`}>
                <div className="w-full flex items-center justify-baseline pl-6 gap-9 py-2 border-b-orange-50">
                    <FolderPlus onClick={() => { 
                        setisFile(false)
                        Createfolder()}}  className="w-6 h-6 text-yellow-600 cursor-pointer" />
                    <FilePlus    onClick={() => {
                        setisFile(true)
                        Createfolder()}}  className="w-6 h-6 text-blue-600 cursor-pointer" />
                </div>
                <FileSystem folders={fileTree}  />
            </div>


            {/* this is the editor in the middle   */}
            <div className="w-full h-screen grid-cols-3 bg-green-500"> 
                <CodeEditor/>
                { isModabolen && <NameInputModal /> }
            </div>



            <div className="z-10 w-80 absolute top-0 right-0 h-screen">
                <ChatSidebar/> 
            </div>


        </div>

    );
}
export default Home;
