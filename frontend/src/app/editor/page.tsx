"use client";
import React, { useEffect, useState } from "react";
import { ChatSidebar } from "@/components/ChatBar";
import CodeEditor from "../../components/Editor";
import FileSystem from "@/components/FileSystem";
import NameInputModal from "../../components/ui/CreateFolderModal";
import { useFileSystem } from "@/context/FileTreeContext";
import { FilePlus, FolderPlus, Menu, X } from "lucide-react";
import { useFileTree } from "@/context/EditorContext";
import { createPortal } from "react-dom";
import axios from "axios";
import { User, Users, Home } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useEnvFile } from "@/context/getNextConfigEnv"
const HomePage = () => {
    const { fileTree } = useFileSystem();
    const { isModalOpen, flag, setFlag, name, setName } = useFileTree();
    const [isFileSystemOpen, setIsFileSystemOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isCreateModalOpen, setisCreateModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isMainFolderExists, setisMainFolderExists] = useState(false);
    const envFile = useEnvFile()

    useEffect(() => {
        const getEmail = localStorage.getItem("email");
        if (!getEmail) return;
        setEmail(getEmail);
    }, [email]);

    useEffect(() => {
        const isFolderNotFetch = localStorage.getItem("main_DocumentId") === "";
        setisMainFolderExists(isFolderNotFetch);
    }, [isMainFolderExists]);

    const newFile = async () => {
        try {
            const res = await axios.post(
                envFile.apiBaseUrl + "/api/doc/newDocument",
                {
                    parentId: localStorage.getItem("main_DocumentId"),
                    content: "",
                    fileName: name,
                    email: email,
                    ownerType: "Owner",
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

    const CreateFolder = async () => {
        try {
            const res = await axios.post(
                envFile.apiBaseUrl + "/api/doc/createFolder", {
                parentId: null,
                folderName: name,
                email: email,
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
    const setFlagAndOPenModal = (flag: string) => {
        setFlag(flag);
        setisCreateModalOpen(true);
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
        if (flag == "createFolder") {
            CreateFolder();
            setName("");
        } else if (flag == "newFile") {
            newFile();
            setName("");
        }
        setisCreateModalOpen(false);
    };

    const handleCancel = () => {
        setisCreateModalOpen(false);
    };

    return (
        <div className="w-full h-screen bg-gray-950 text-gray-100 flex relative overflow-hidden">
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
                                onClick={() => setFlagAndOPenModal("createFolder")}
                                className="flex items-center gap-2 px-3 py-2 cursor-pointer bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg transition-all duration-200 hover:scale-105"
                            >
                                <FolderPlus className="w-5 h-5" />
                                <span className="text-sm font-medium">Folder</span>
                            </button>
                            <button
                                disabled={isMainFolderExists}
                                onClick={() => setFlagAndOPenModal("newFile")}
                                className="flex items-center gap-2 px-3 py-2 
             bg-blue-500/10 
             text-blue-400 
             rounded-lg 
             transition-all duration-200
             cursor-pointer 
             hover:bg-blue-500/20 hover:scale-105
             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500/10 disabled:hover:scale-100"
                            >
                                <FilePlus className="w-5 h-5" />
                                <span className="text-sm font-medium">File</span>
                            </button>
                        </div>
                        <div className="h-full overflow-auto">
                            {/* @ts-expect-error can be fix with types anotation later*/}
                            <FileSystem folders={fileTree} />
                        </div>
                    </div>
                </div>
            )}

            {isCreateModalOpen
                ? createPortal(
                    <div className="mx-auto fixed inset-0 bg-opacity-20 flex items-center justify-center z-50">
                        <div className="bg-gray-900 rounded-xl shadow-2xl p-6 w-96 border border-gray-700">
                            {/* Title */}
                            <h2 className="text-lg font-semibold mb-4 text-white">
                                {flag == "createFolder" ? "Create folder" : "Create file"}
                            </h2>
                            <input
                                type="text"
                                value={name}
                                placeholder="Enter name..."
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-gray-800 text-white border border-gray-600 rounded-md px-3 py-2 mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {/* Buttons */}
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => handleSubmit()}
                                    className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                                >
                                    Create
                                </button>
                                <button
                                    onClick={() => handleCancel()}
                                    className="bg-gray-700 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )
                : ""}

            {/* File System Sidebar - Desktop */}
            <div className="hidden pl-1 lg:flex lg:w-50 bg-white/10 border-r border-white/40 flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-100">Explorer</h2>
                </div>
                <div className="flex items-center justify-center gap-6 p-4 border-b border-gray-700/50">
                    <button
                        onClick={() => setFlagAndOPenModal("createFolder")}
                        className="flex items-center gap-2   cursor-pointer px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg transition-all duration-200 hover:scale-105"
                    >
                        <FolderPlus className="w-5 h-5" />
                        <span className="text-sm font-medium">Folder</span>
                    </button>
                    <button
                        disabled={isMainFolderExists}
                        onClick={() => setFlagAndOPenModal("newFile")}
                        className="flex items-center gap-2 px-3 py-2 
             bg-blue-500/10 
             text-blue-400 
             rounded-lg 
             transition-all duration-200
             cursor-pointer 
             hover:bg-blue-500/20 hover:scale-105
             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500/10 disabled:hover:scale-100"
                    >
                        <FilePlus className="w-5 h-5" />
                        <span className="text-sm font-medium">File</span>
                    </button>
                </div>
                <div className="flex-1 overflow-auto">
                    {" "}
                    {/* @ts-expect-error can be fix with types anotation later*/}
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
                    <Link
                        href={"/dashboard"}
                        className="flex items-center gap-3 text-gray-700 hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg transition-all duration-300"
                    >
                        <Home className="w-5 h-5" />
                    </Link>
                    <Link
                        href={"/profile"}
                        className="flex items-center gap-3 text-gray-700 hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg transition-all duration-300"
                    >
                        <User className="w-5 h-5" />
                    </Link>
                    <Link
                        href={"/admin"}
                        className="flex items-center gap-3 text-gray-700 hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg transition-all duration-300"
                    >
                        <Users className="w-5 h-5" />
                    </Link>

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

export default HomePage;
