// filesystem-item-animated.tsx
'use client';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { DocumentIcon, FolderIcon } from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';
import {Node} from "../types/Node"
import { useState , useEffect} from 'react';
import { useFileSystem } from '@/context/FileTreeContext';
export function FilesystemItem({ node }: { node: Node }) {
    const { CreateFile_and_FolderWithin} = useFileSystem()
    const [isOpen, setIsOpen] = useState(false);
    const [isRightClick, setisRightClick] = useState(false);


useEffect(() => {
  const handleClick = () => setisRightClick(false);
  window.addEventListener("click", handleClick);

  return () => window.removeEventListener("click", handleClick);
}, []);

    const CreateFolder_andFile =((node:Node, e:React.MouseEvent) => {
        e.preventDefault()
        console.log('Right click', node);
        localStorage.setItem("folderId", JSON.stringify(node.folderid!))
        setisRightClick(!isRightClick)
    })

    const leftClick =(( e:React.MouseEvent) => {
        e.preventDefault()
        console.log('Right click');
        setisRightClick(false)
    })


    return (
        <li key={node.name} className="relative" onClick={(e) => leftClick(e)}>


            {isRightClick && (
                <div className="absolute top-2 left-16 w-44 p-3 z-50 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
                    <div className="flex flex-col space-y-2">
                        <span   onClick={() => CreateFile_and_FolderWithin(true)  }  className="cursor-pointer text-white text-sm hover:bg-gray-700 px-3 py-2 rounded-md transition">
                            📝 New File
                        </span>
                        <span onClick={() => CreateFile_and_FolderWithin(false)  } className="cursor-pointer text-white text-sm hover:bg-gray-700 px-3 py-2 rounded-md transition">
                            📁 Create Folder
                        </span>
                        <span   onClick={() => Dletefile_and_folder()  }  className="cursor-pointer text-red-400 text-sm hover:bg-red-900 px-3 py-2 rounded-md transition">
                            🗑️ Delete Folder
                        </span>
                    </div>
                </div>
            )}


            <span  onClick={(e) =>  {setIsOpen(!isOpen) 
                leftClick(e)  } }
                onContextMenu={(e) => CreateFolder_andFile(node,  e)} className="flex items-center gap-0.5 py-1 cursor-pointer">
                {node.nodes && node.nodes.length > 0 && (
                    <button > 
                        <motion.span
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                            className="flex"
                        >
                            <ChevronRightIcon className="size-4 text-gray-500" />
                        </motion.span>
                    </button>
                )}

                {node.nodes ? (
                    <FolderIcon
                        className={`size-6 text-sky-500 ${
node.nodes.length === 0 ? 'ml-[12px]' : ''
}`}
                    />
                ) : (
                        <DocumentIcon className="ml-[12px] size-6 text-gray-200" />
                    )}
                {node.name}
            </span>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                        className="pl-3 overflow-hidden flex flex-col justify-end"
                    >
                        {node.nodes?.map((node) => (
                            <FilesystemItem node={node} key={node.name} />
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </li>
    );
}


