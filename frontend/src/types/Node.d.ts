export type Node = {
  folderid?: string;
  name: string;
  nodes?: Node[] | null;
};

export type FileSystemContextType = {
  fileTree: Node[];
  setFileTree: React.Dispatch<React.SetStateAction<Node[]>>;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
};
