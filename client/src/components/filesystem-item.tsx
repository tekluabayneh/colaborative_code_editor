// filesystem-item-animated.tsx
'use client';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { DocumentIcon, FolderIcon } from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';

import { useState } from 'react';

type Node = {
  name: string;
  nodes?: Node[];
};

export function FilesystemItem({ node }: { node: Node }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRightClick, setisRightClick] = useState(false);



const CreateFolder_andFile =((folderId:string, e:React.MouseEvent) => {
        e.preventDefault()
     console.log('Right click');
      setisRightClick(!isRightClick)
    })

const leftClick =(( e:React.MouseEvent) => {
        e.preventDefault()
     console.log('Right click');
      setisRightClick(false)
    })





  return (
    <li key={node.name} className="relative" onClick={(e) => leftClick(e)}   >
            { isRightClick && <div className='absolute top-2 left-16 w-40 p-5 h-40 z-50 bg-gray-800 rounded '> <div className='flex items-left pl-1 justify-center gap-0.5 flex-col'>
    <span className='cursor-pointer text-white text-lg text-nowrap '>New file</span>
     <span  className='cursor-pointer text-white text-lg text-nowrap'>Create folder</span>
     <span  className='cursor-pointer text-white text-lg'> Delte folder</span>
        </div>
        </div>
}

      <span  onClick={(e) =>  {setIsOpen(!isOpen) 
                      leftClick(e)  
            }
            } onContextMenu={(e) => CreateFolder_andFile(node.name, e)} className="flex items-center gap-0.5 py-1 cursor-pointer">
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
          <DocumentIcon className="ml-[12px] size-6 text-gray-900" />
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


