"use client"
import React, { useState } from "react";
import {Node } from "../../types/Node"

type PropsType = {
    setFileTree: React.Dispatch<React.SetStateAction<Node[]>>,
    setisModalopen: React.Dispatch<React.SetStateAction<boolean>>,
    isFile:boolean
}


const generateId = () => crypto.randomUUID();

const NameInputModal = ({setFileTree, setisModalopen, isFile}: PropsType) => {
    const [name, setName] = useState("");

    const handleSubmit = () => {
        const newFolder:Node= {
            folderid:generateId(),
            name: name,
            nodes: [],

        }
        const newFile:Node = {
            name:name 
        }

            setFileTree((prev:Node[]) => [...prev, isFile ? newFile : newFolder])
            setisModalopen(false)

    }

    const handleCancel= () => {
        setisModalopen(false)
    }


    return (
        <div className=" mx-auto mt-50 bg-gary-50 fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-80">
                <h2 className="text-lg font-semibold mb-4 text-black">Enter Title</h2>
                <input
                    type="text"
                    value={name}
                    placeholder="New name..."
                    onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 text-black rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Create
                    </button>
                    <button
                        onClick={handleCancel}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NameInputModal;
