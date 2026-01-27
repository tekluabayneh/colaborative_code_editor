"use client";
import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
} from "react";
import { Node, FileSystemContextType } from "@/types/Node";
import axios from "axios";
import { useEnvFile } from "@/context/getNextConfigEnv"

const FileSystemContext = createContext<FileSystemContextType | null>(null);

export const FileSystemProvider = ({ children }: { children: ReactNode }) => {
    const [fileTree, setFileTree] = useState<Node[] | null>(null);
    const [email, setEmail] = useState("");
    const envFile = useEnvFile()

    useEffect(() => {
        const loclStorageEamil = localStorage.getItem("email")!;
        setEmail(loclStorageEamil);
    }, [email])

    useEffect(() => {
        if (!email) return;
        const handleFetchFileTree = async (email: string) => {
            try {
                const response = await axios.post(
                    envFile.apiBaseUrl + "/api/doc/GetAllFolderTree", { email: email, }, { withCredentials: true });
                setFileTree(response.data);

                if (response?.data[0]) {
                    localStorage.setItem("main_DocumentId", response?.data[0]._id);
                } else {
                    localStorage.setItem("main_DocumentId", "");
                }
            } catch (err) {
                console.error("Error fetching file tree:", err);
            }
        };
        handleFetchFileTree(email);
    }, [email, envFile]);

    return (
        <FileSystemContext.Provider
            value={{
                fileTree,
                // @ts-expect-error mus be intilized with null
                setFileTree,
                email,
            }}
        >
            {children}
        </FileSystemContext.Provider>
    );

};
export const useFileSystem = () => {
    const context = useContext(FileSystemContext);
    if (!context)
        throw new Error("useFileSystem must be used within a FileSystemProvider");
    return context;
};
