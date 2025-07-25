
import { FolderIcon , DocumentIcon} from '@heroicons/react/solid'
import { ChevronDown, ChevronRightIcon, Folders } from 'lucide-react'
import { useState } from 'react'
type FolderType ={
    name:string,
    folders?: FolderType[]
}

const FileSystem =() => {

    const [isClosed, setisClosed] = useState(false)


    const Files:FolderType[] = [
        { name:"Home", 
            folders:[
                {name:"movies", 
                    folders: [{name:"action"}, 
                        {name:"c1omedy"},
                       {name:"gladiator"}
                    ]},
                {name:"Picture",

                    folders: 
                    [
                        {name:"acsdftion"}, 

                        {name:"c34omedy"}]},

                {name:"Document.md"},
                { name:"home", folders:  [{name:"action123kkjk"}, {name:"main.js"}]},
                {name:"yjs.ts"},
                {name:"README.md"} ,
                {name:"comedy", folders:[{name:"show.ts" ,folders:[] }]}

            ] 
        }

    ]
    return  (

        <div className='p-8 max-w-sm mx-auto'> 
            <ul>
                <li  className='my-1.5'>
                    <ul className='pl-6'>
                        {Files.map((item ,index,) => (
                            <BuildFolder folder={item} key={index} /> 
                        ))}
                    </ul>

                </li>

            </ul>

        </div> 

    )

}



const BuildFolder = ({folder}:{folder:FolderType}) => { 
    const [isClosed, setisClosed] = useState(false)

    return (
        <li   key={folder.name} className='my-1.5 '> 
            <span  onClick={() => setisClosed(!isClosed)}   className='cursor-pointer flex items-center gap-1.5 transition translate-0.5'>
                { folder.folders && 
              <button>
                { !isClosed ?
                 <ChevronRightIcon className='size-6 text-gray-500'/>: 
                 <ChevronDown  className='size-6 text-gray-500'/>
                }
                </button>   }
                {folder.folders ? ( <FolderIcon className='size-6 text-sky-500 '/> ) :  ( <DocumentIcon className='size-6 ml-4 text-gray-500'/> )}
                {folder.name} 
            </span>
            {isClosed &&
            <ul className='pl-6'>
                {folder.folders?.map((item) => (
                    <BuildFolder folder={item} key={item.name}/> 
                ))}
            </ul>}
        </li>
    )
}

export default FileSystem

