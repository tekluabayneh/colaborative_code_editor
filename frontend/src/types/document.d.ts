export type DocumentType = {
	contentId :string | null, 
	folderId :string, 
	name :string, 
	nodes :DocumentType[], 
	ownerId :string, 
	ownerType:string,
	parentId :string | null
	_id:string,
}



export type FileSyncHandeleContentType = {
    // setFileTree: React.Dispatch<React.SetStateAction<Node[]>>;
   CurrentFileInEditor:[]
   DeleteFile: () => void,
   DeleteFolder:() => void, 
  updateFileToEditor:(file:DocumentType) => void,
  SaveFileContentToDb:() => void,
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

