
import React, { useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import axios from "axios";

export default function CodeEditor() {
	const editorRef = useRef<any>(null);
   

        // fetch all the folder tree of the user  
	// first when user click diffretn file it need to change  language 
	// second when user click diffent file it need to load those file 
	// thired when user  click (CTL + S)  it need to save those file to db 
	// four when user 
	//

		// store editor instance
		const handleEditorDidMount = (editor: any, monaco: Monaco) => {
			editorRef.current = editor;
		};

	// handle when user change file 
	const HandleFileChange = async(e:React.ChangeEvent<HTMLInputElement>) => { 
		const contentResponse = await axios.post("get the documetn by documetn id", {withCredential:true}) 
                 const {FileName,FileExtenstion, content} = contentResponse.data

			editorRef.current.setValue(content); 
			monaco.editor.setModelLanguage(editorRef.current.getModel(), FileExtenstion);

		//  here this is mistake we dont get the file form the local machine it from db so the idea need to be teack 
		//  first make request witht the document id 
		//  and load the documetn in the editor with teh extension of the file
	} 


	// handle when user type code in the editor
	const HandleONchnageFile = () => { 
				} 


		return (
			<div className="w-full h-screen">
				<Editor
					height="100%"
					defaultLanguage="javascript"
					defaultValue={`//Welcome to your VS Code-like editor\nfunction hello() {\n  console.log("Hello, world!");\n}`}
					theme="vs-dark"
					options={{
						fontSize: 14,
						minimap: { enabled: false },
						wordWrap: "on",
						automaticLayout: true,
					}}
					onMount={handleEditorDidMount}
				/>
			</div>
		);
	}

