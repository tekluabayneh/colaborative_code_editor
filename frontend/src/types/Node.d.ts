export type Node = {
  folderId?: string;
  name: string;
  nodes?: Node[] | null;
};

export type FileSystemContextType = {
  fileTree: Node[] | null;
  setFileTree: React.Dispatch<React.SetStateAction<Node[]>> | null;
  email:string
};
