"use client";
import React, { useEffect } from "react";
import { useFileTree } from "@/context/EditorContext";

const NameInputModal = () => {
  const { name, setName, flag, handleSubmit, handleCancel, deleteModalOpen } =
    useFileTree();
  console.log("this is the flag", flag);
  const isRename = flag === "Rename";

  return (
    <div className="mx-auto fixed inset-0 bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl shadow-2xl p-6 w-96 border border-gray-700">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-4 text-white">
          {deleteModalOpen
            ? "Confirm Delete"
            : isRename
            ? "Rename Item"
            : "Create Item"}
        </h2>

        {/* If not delete → show input */}
        {!deleteModalOpen && (
          <input
            type="text"
            value={name}
            placeholder={isRename ? "Enter new name..." : "Enter name..."}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-md px-3 py-2 mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        {/* If delete → show warning */}
        {deleteModalOpen && (
          <p className="text-red-400 mb-4 text-sm">
            ⚠️ This delete is <span className="font-bold">recursive</span> and
            could also delete files and folders inside it. Are you sure you want
            to continue?
          </p>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => handleSubmit()}
            className={`${
              deleteModalOpen
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-4 py-2 rounded-md cursor-pointer transition`}
          >
            {deleteModalOpen
              ? "Delete Anyway"
              : deleteModalOpen
              ? "Rename"
              : "Create"}
          </button>
          <button
            onClick={() => handleCancel()}
            className="bg-gray-700 text-white cursor-pointer px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NameInputModal;
