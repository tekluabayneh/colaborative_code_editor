// filesystem-item-animated.tsx
"use client";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { DocumentIcon, FolderIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import { Node } from "../types/Node";
import { useState, useEffect } from "react";
import axios from "axios";
import { DocumentType } from "../types/document";
import { useFileTree } from "../context/EditorContext";
import { createPortal } from "react-dom";

export function FilesystemItem({ node }: { node: DocumentType }) {
  const { updateFileToEditor, openModalWithFlag } = useFileTree();
  const [isOpen, setIsOpen] = useState(false);
  const [isRightClick, setisRightClick] = useState(false);

  useEffect(() => {
    const handleClick = () => setisRightClick(false);
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  const CreateFolder_andFile = (node: Node, e: React.MouseEvent) => {
    e.preventDefault();
    setisRightClick(!isRightClick);
  };

  const leftClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setisRightClick(false);
  };

  const fetchcontentFile = async (node: DocumentType) => {
    if (!node.contentId) {
      console.log("This is a folder, no content to fetch");
      return;
    }

    const result = await axios.get(
      `http://localhost:5000/api/doc/GetSingleDocument/${node.contentId}`,
      { withCredentials: true }
    );
    updateFileToEditor(result.data);
  };

  return (
    <li key={node?.folderId} className="relative" onClick={(e) => leftClick(e)}>
      {isRightClick &&
        createPortal(
          <div className="absolute top-50 left-36 w-44 p-3 z-50 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
            <div className="flex flex-col space-y-2">
              <span
                onClick={() => openModalWithFlag(node, "newFile")}
                className="cursor-pointer text-white text-sm hover:bg-gray-700 px-3 py-2 rounded-md transition"
              >
                📝 New File
              </span>
              <span
                onClick={() => openModalWithFlag(node, "createFolder")}
                className="cursor-pointer text-white text-sm hover:bg-gray-700 px-3 py-2 rounded-md transition"
              >
                📁 Create Folder
              </span>
              <span
                onClick={() => openModalWithFlag(node, "Rename")}
                className="cursor-pointer text-white text-sm hover:bg-gray-700 px-3 py-2 rounded-md transition"
              >
                ✏️ Rename
              </span>
              <span
                onClick={() => openModalWithFlag(node, "Delete", true)}
                className="cursor-pointer text-red-400 text-sm hover:bg-red-900 px-3 py-2 rounded-md transition"
              >
                🗑️ Delete Folder
              </span>
            </div>
          </div>,
          document.body
        )}

      <div
        onClick={(e) => {
          setIsOpen(!isOpen);
          leftClick(e);
        }}
        onContextMenu={(e) => CreateFolder_andFile(node, e)}
        className="flex items-center gap-0.5 py-1 cursor-pointer"
      >
        {node?.nodes && node?.nodes?.length > 0 && (
          <button>
            <motion.span
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="flex"
            >
              <ChevronRightIcon className="size-4 text-gray-500" />
            </motion.span>
          </button>
        )}
        {node?.contentId == null ? (
          <FolderIcon
            className={`size-6 text-sky-500 ${
              node?.nodes?.length === 0 ? "ml-[12px]" : ""
            }`}
          />
        ) : (
          <DocumentIcon className="ml-[12px] size-6 text-gray-200" />
        )}
        <span onClick={() => fetchcontentFile(node as DocumentType)}>
          {" "}
          {node?.name}{" "}
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="pl-3 overflow-hidden flex flex-col justify-end"
          >
            {node.nodes?.map((node) => (
              <FilesystemItem node={node} key={node?.name} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
