"use client";
import React, { useEffect } from "react";
import { Node } from "../../types/Node";
import { useFileTree } from "@/context/EditorContext";

type PropsType = {
  setFileTree: React.Dispatch<React.SetStateAction<Node[]>>;
  setisModalopen: React.Dispatch<React.SetStateAction<boolean>>;
  isFile: boolean;
};

const NameInputModal = () => {
  const { name, setName, handleSubmit, handleCancel } = useFileTree();
  return (
    <div className="mx-auto fixed inset-0 bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl shadow-2xl p-6 w-80 border border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-white">Enter Title</h2>
        <input
          type="text"
          value={name}
          placeholder="New name..."
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-800 text-white border border-gray-600 rounded-md px-3 py-2 mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => handleSubmit()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create
          </button>
          <button
            onClick={() => handleCancel()}
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NameInputModal;
