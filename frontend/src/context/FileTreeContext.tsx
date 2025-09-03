"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { toast } from "react-hot-toast";
import { Node, FileSystemContextType } from "@/types/Node";
import axios from "axios";
const FileSystemContext = createContext<FileSystemContextType | null>(null);

export const FileSystemProvider = ({ children }: { children: ReactNode }) => {
  const [fileTree, setFileTree] = useState<Node[]>();
  const email = "fake@gmail.com";

  useEffect(() => {
    const handleFetchFileTree = async (email: string) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/doc/GetAllFolderTree",
          {
            email: email,
          },
          { withCredentials: true }
        );
        setFileTree(response.data);
        console.log(fileTree);
      } catch (err) {
        console.error("Error fetching file tree:", err);
      }
    };
    handleFetchFileTree(email);
  }, [email]);

  useEffect(() => {
    console.log("✅ File Tree Updated", JSON.stringify(fileTree, null, 2));
  }, [fileTree]);

  return (
    <FileSystemContext.Provider
      value={{
        fileTree,
        setFileTree,
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
