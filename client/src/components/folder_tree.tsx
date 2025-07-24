import { VscFolder, VscFile } from 'react-icons/vsc';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

type folderType = {
  _id: string | number,
  name: string,
  parentId: string | number | null,
  extension: string,
  content: string,
  ownerId: string,
  type: string,
  children: folderType[],
  Documents: folderType[],
}

type FolderTreeProps = {
  Documents: folderType[]
  onFileClick?: (id: number | string) => void
}

const Folder_tree = ({ Documents, onFileClick }: FolderTreeProps) => {
  // Each Folder_tree instance tracks its own open/close state
  const [isClosed, setIsClosed] = useState(true);

  return (
    <ul>
      {Documents.map(item => (
        <li key={item._id}>
          {item.type === "folder" ? (
            <>
              <div
                className='flex items-center cursor-pointer select-none'
                onClick={() => setIsClosed(!isClosed)}  // toggle on folder click
              >
                {/* Toggle icon changes based on open/closed */}
                {isClosed ? <ChevronRight /> : <ChevronDown />}
                <div className='flex items-center gap-1 ml-1'>
                  <VscFolder /> {item.name}
                </div>
              </div>

              {/* Show children only if open */}
              {!isClosed && item.children?.length > 0 && (
                <div className='pl-2'>
                  <Folder_tree Documents={item.children} onFileClick={onFileClick} />
                </div>
              )}
            </>
          ) : (
            <div
              className='flex items-center pl-2 pt-1 gap-1 cursor-pointer'
              onClick={() => onFileClick?.(item._id)}
            >
              <VscFile /> {item.name}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Folder_tree;

