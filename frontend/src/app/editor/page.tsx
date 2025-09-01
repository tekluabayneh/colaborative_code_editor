"use client";
import React, { useState } from "react";
import { ChatSidebar } from "@/components/ChatBar";
import CodeEditor from "../../components/Editor";
import FileSystem from "@/components/FileSystem";
import NameInputModal from "../../components/ui/CreateFolderModal";
import { useFileSystem } from "@/context/FileTreeContext";
import { FilePlus, FolderPlus, Menu, X } from "lucide-react";
import { useFileTree } from "@/context/EditorContext";
const Home = () => {
  const { fileTree } = useFileSystem();
  const { isModalOpen, Createfolder, setisFile } = useFileTree();
  const [isFileSystemOpen, setIsFileSystemOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="w-full h-screen bg-gray-950 text-gray-100 flex relative overflow-hidden">
      {/* File System Overlay - Mobile/Tablet */}
      {isFileSystemOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 "
            onClick={() => setIsFileSystemOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-60 bg-gray-900 border-r border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-gray-100">Explorer</h2>
              <button
                onClick={() => setIsFileSystemOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-6 p-4 border-b border-gray-700/50">
              <button
                onClick={() => Createfolder()}
                className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <FolderPlus className="w-5 h-5" />
                <span className="text-sm font-medium">Folder</span>
              </button>
              <button
                onClick={() => Createfolder()}
                className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <FilePlus className="w-5 h-5" />
                <span className="text-sm font-medium">File</span>
              </button>
            </div>
            <div className="h-full overflow-auto">
              <FileSystem folders={fileTree} />
            </div>
          </div>
        </div>
      )}

      {/* File System Sidebar - Desktop */}
      <div className="hidden pl-1 lg:flex lg:w-50 bg-white/10 border-r border-white/40 flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-gray-100">Explorer</h2>
        </div>
        <div className="flex items-center justify-center gap-6 p-4 border-b border-gray-700/50">
          <button
            onClick={() => Createfolder()}
            className="flex items-center gap-2   cursor-pointer px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg transition-all duration-200 hover:scale-105"
          >
            <FolderPlus className="w-5 h-5" />
            <span className="text-sm font-medium">Folder</span>
          </button>
          <button
            onClick={() => Createfolder()}
            className="flex items-center cursor-pointer gap-2 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all duration-200 hover:scale-105"
          >
            <FilePlus className="w-5 h-5" />
            <span className="text-sm font-medium">File</span>
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <FileSystem folders={fileTree} />
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="flex items-center h-10 justify-between px-4 py-3 bg-gray-900/50 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFileSystemOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm font-medium text-gray-400 ml-4">
              Code Editor
            </span>
          </div>
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="xl px-3 py-1.5 bg-blue-500/10 cursor-pointer hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors text-sm font-medium"
          >
            Chat {isChatOpen ? "Hide" : "Show"}
          </button>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          <CodeEditor />
        </div>
      </div>

      {/* Chat Sidebar - Mobile Overlay */}
      {isChatOpen && (
        <div className="fixed inset-0 z-40 ">
          <div
            className="absolute inset-0 "
            onClick={() => setIsChatOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 border-l border-gray-700 shadow-2xl">
            <div className="h-full">
              <ChatSidebar setIsChatOpen={setIsChatOpen} />
            </div>
          </div>
        </div>
      )}
      {/* Create Modal */}
      {isModalOpen && <NameInputModal />}
    </div>
  );
};

export default Home;
