import { VscFolder, VscFile } from 'react-icons/vsc'
 
import { ChevronRight, ChevronDown} from 'lucide-react';
import { useState } from 'react';

type folderType = {
 name:string,
 parentId:string,
  extension:string,
content:string,
    ownerId:string,
    type:string
}


const Folder_tree = ({Documents})=> {
    const [isClosed , setisClosed] = useState(false)
    // console.log(Documents)
 const onFileClick = () => {
    }
    return (
    <ul>
      {Documents.map(item => (
        <li key={item._id}>
          {item.type === "folder" ? (
            <>
              <span>📁 {item.name}</span>
              {item.children?.length > 0 && (
                <Folder_tree Documents={item.children} onFileClick={onFileClick} />
              )}
            </>
          ) : (
            <span onClick={() => onFileClick(item._id)}>📄 {item.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Folder_tree;


                // return  item.type === "folder" ? <div className='flex  cursor-pointer items-center gap-1 hover:bg-gray-800'>
                //
                //    <span className='flex items-center'>
                //  {isClosed ? <ChevronDown /> : <ChevronRight/>}
                //         <VscFolder /> 
                //    </span>
                //     <span key={index}>{item.name}</span>
                // </div>
                //     :
                //
                //     <p className='flex  cursor-pointer items-center gap-1 hover:bg-gray-800'>
                //         <VscFile/> 
                //     <span key={index}>
                //         {item.name}
                //     </span>
                //     </p>
