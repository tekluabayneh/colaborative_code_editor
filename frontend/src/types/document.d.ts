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



