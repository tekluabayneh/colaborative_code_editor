"use client"
import React,{useState} from "react";
import Folder_tree from "@/components/folder_tree";
import { ChatSidebar } from "@/components/ChatBar";
import CodeEditor from  "../../components/Editor"


const file= [
  {
    _id: 1,
    name: "root",
    type: "folder",
    parentId: null,
    children: [
      {
        _id: 2,
        name: "src",
        type: "folder",
        parentId: 1,
        children: [
          {
            _id: 3,
            name: "components",
            type: "folder",
            parentId: 2,
            children: [
              {
                _id: 4,
                name: "App.js",
                type: "file",
                parentId: 3,
                children: []
              }
            ]
          },
          {
            _id: 5,
            name: "utils",
            type: "folder",
            parentId: 2,
            children: [
              {
                _id: 6,
                name: "math.js",
                type: "file",
                parentId: 5,
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
]


const Home = () => {
    const [resizeFileTree, setReziseFileTree] = useState(30)
  
    return (
        <div className="w-full flex justify-center items-center h-screen relative">


            {/* this is the folder and file tree  */}
        <div className={`h-screen w-${resizeFileTree} `}>
            <Folder_tree Documents={file}/>
        </div>


           {/* this is the editor in the middle   */}
        <div className="w-full h-screen grid-cols-3 bg-green-500"> 
            <CodeEditor/>
        </div>



        <div className="z-10 w-80 absolute top-0 right-0 h-screen">
               <ChatSidebar/> 
        </div>


        </div>

    );
}
export default Home;
