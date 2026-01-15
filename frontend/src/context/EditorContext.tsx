"use client";
import React, {
    createContext,
    ReactNode,
    useState,
    useContext,
} from "react";
import { DocumentType, FileSyncHandeleContentType } from "../types/document";
import axios from "axios";
const FileTreeContent = createContext<FileSyncHandeleContentType | null>(null);
import toast from "react-hot-toast";
import { useFileSystem } from "./FileTreeContext";
type nodes = {
    node: DocumentType | [];
    name: string;
};
export const FileContentProvider = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [flag, setFlag] = useState("");
    const { setFileTree, email } = useFileSystem();
    const [CurrentFileInEditor, SetCurrentFileInEditor] = useState<
        DocumentType[] | null
    >(null);

    const [toBeUpdated, settoBeupdated] = useState<nodes>({
        node: [],
        name: "",
    });

    const handelRefresh = async (email: string) => {
        try {
            const response = await axios.post(
                process.env.BACKEND_BASEURL + "/api/doc/GetAllFolderTree",
                {
                    email: email,
                },
                { withCredentials: true }
            );
            if (!response.data) return;
            // @ts-expect-error data type will be added
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

    const UpdateFileName = async ({ node }: { node: DocumentType }) => {
        try {
            const res = await axios.put(
                process.env.BACKEND_BASEURL + "/api/doc/UpdateFolderName/",
                { folderId: node.folderId, newName: name },
                { withCredentials: true }
            );
            toast.success(res.data.message);
            await handelRefresh(email);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
        }
    };

    // const UpdateDocument = async (node: DocumentType) => {
    //     console.log("thsi is the node from the context to be updated man", node);
    //     // const res = await axios.put("http://localhost:5000/api/doc/UpdateFolderOrFileName", {}, {withCredentials:true})
    //     // console.log(res)
    // };

    const newFile = async ({ node }: { node: DocumentType }) => {
        try {
            const res = await axios.post(
                process.env.BACKEND_BASEURL + "/api/doc/newDocument",
                {
                    parentId: node._id,
                    content: "",
                    fileName: name,
                    email: localStorage.getItem("email"),
                    ownerType: node.ownerType,
                },
                { withCredentials: true }
            );
            toast.success(res.data.message);
            await handelRefresh(email);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
        }
    };

    const CreateFolder = async ({ node }: { node: DocumentType }) => {
        try {
            const res = await axios.post(
                process.env.BACKEND_BASEURL + "/api/doc/createFolder",
                {
                    parentId: node._id,
                    folderName: name,
                    email: localStorage.getItem("email"),
                },
                { withCredentials: true }
            );
            toast.success(res.data.message);
            await handelRefresh(email);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
        }
    };

    const DeleteFolder = async ({ node }: { node: DocumentType }) => {
        try {
            const res = await axios.delete(
                process.env.BACKEND_BASEURL + `/api/doc/DeleteDocument`,
                {
                    data: {
                        email: localStorage.getItem("email"),
                        folderId: node.folderId,
                    },
                    withCredentials: true,
                }
            );
            toast.success(res.data.message);
            await handelRefresh(email);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || error.message;
                toast.error(message);
            }
        }
    };

    const updateFileToEditor = (file: DocumentType[]) => {
        SetCurrentFileInEditor(file);
    };
    const SaveFileContentToDb = () => { };

    const openModalWithFlag = (
        node: DocumentType,
        flagValue: string,
        isDelete: boolean = false
    ) => {
        setFlag(flagValue);
        localStorage.setItem("flag", flagValue);

        settoBeupdated((prev) => ({
            ...prev,
            node: node,
        }));
        setIsModalOpen(true);
        setDeleteModalOpen(isDelete);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const Dletefile_and_folder = () => {
        setIsModalOpen(true);
        setDeleteModalOpen(false);
    };

    const toUpdate = { ...toBeUpdated, name } as { node: DocumentType };
    const handleSubmit = () => {
        function setToBeUpdatedCase() {
            if (!flag) return;
            switch (flag) {
                case "newFile":
                    newFile(toUpdate);
                    break;
                case "createFolder":
                    CreateFolder(toUpdate);
                    break;
                case "Rename":
                    UpdateFileName(toUpdate);
                    break;
                case "Delete":
                    DeleteFolder(toUpdate);
                    break;
                default:
                    return "nothing to update";
            }
        }

        if (flag === "Delete") {
            setToBeUpdatedCase();
            setIsModalOpen(false);
            return;
        }
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

        settoBeupdated((prev) => ({
            ...prev,
            name: name,
        }));
        setToBeUpdatedCase();
        setIsModalOpen(false);
        setName("");
    };

    return (
        <FileTreeContent.Provider
            value={{
                name,
                flag,
                setFlag,
                setName,
                isModalOpen,
                setIsModalOpen,
                Dletefile_and_folder,
                updateFileToEditor,
                SaveFileContentToDb,
                handleSubmit,
                handleCancel,
                openModalWithFlag,
                deleteModalOpen,
                CurrentFileInEditor,
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
