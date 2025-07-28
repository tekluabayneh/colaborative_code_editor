export type Node = {
  folderid?:string;
  name: string;
  nodes?: Node[];
};

export type FileSystemContextType = {
    name: string;
    setName: (value: string) => void;
    isModabolen: boolean;
    setisModalopen: (value: boolean) => void;
    isFile: boolean;
    setisFile: (value: boolean) => void;
    fileTree: Node[];
    setFileTree: React.Dispatch<React.SetStateAction<Node[]>>;
    handleSubmit: () => void;
    handleCancel: () => void;
    Createfolder : () => void;
    CreateFile_and_FolderWithin:(isFile:boolean) => void
    Dletefile_and_folder: () => void
};




