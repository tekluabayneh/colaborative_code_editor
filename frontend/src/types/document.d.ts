export type DocumentType = {
  contentId: string | null;
  folderId: string;
  name: string;
  nodes: DocumentType[];
  ownerId: string;
  ownerType: string;
  parentId: string | null;
  _id: string;
};

export type FileSyncHandeleContentType = {
  CurrentFileInEditor: DocumentType[] | null;
  updateFileToEditor: (file: DocumentType[]) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteModalOpen: boolean;
  isModalOpen: boolean;
  newDocument: (node: DocumentType) => void;
  flag: string;
  setFlag: React.Dispatch<React.SetStateAction<string>>;
  Createfolder: (node: DocumentType) => void;
  deleteFolder: (node: DocumentType) => void;
  UpdateDocument: (node: DocumentType) => void;
  handelFolderNam_rename: (node: DocumentType) => void;
  Dletefile_and_folder: () => void;
  SaveFileContentToDb: () => void;
  handleSubmit: () => void;
  handleCancel: () => void;
};

export const extensionToLanguage: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  html: "html",
  css: "css",
  json: "json",
  md: "markdown",
  yml: "yaml",
  yaml: "yaml",
  sh: "shell",
  c: "c",
  cpp: "cpp",
  java: "java",
  cs: "csharp",
  php: "php",
  rs: "rust",
  go: "go",
  swift: "swift",
  kt: "kotlin",
  rb: "ruby",
  sql: "sql",
  dockerfile: "dockerfile",
  makefile: "makefile",
};
