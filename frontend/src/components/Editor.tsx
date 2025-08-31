import React, { useRef, useEffect } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import axios from "axios";
import {useFileTree } from "../context/EditorContext"
export default function CodeEditor() {
	const {CurrentFileInEditor, SaveFileContentToDb} = useFileTree()
	// fetch all the folder tree of the user  
	// first when user click diffretn file it need to change  language 
	// second when user click diffent file it need to load those file 
	// thired when user  click (CTL + S)  it need to save those file to db 
	// four when user 
	//
	const editorRef = useRef<any>(null);
	const monacoRef = useRef<any>(null);


	const handleEditorDidMount = (editor: any, monaco: Monaco) => {
		editorRef.current = editor;
		monacoRef.current = monaco;
	};

	const handleFileChange = (file: {FileExtenstion: string; content: string }) => {
		if(!file) return 
		if (!editorRef.current || !monacoRef.current) return;
		editorRef.current.setValue(file.content);
		const model = editorRef.current.getModel();
		if (model) {
	const extensionToLanguage = { js: "javascript", ts: "typescript", py: "python", html: "html", };
	const language = extensionToLanguage[file.FileExtenstion] || "javascript";
	monacoRef.current.editor.setModelLanguage(editorRef.current.getModel(), language);

		}
	};

	useEffect(() => {

		// @ts-expect-error data has the type 
		if (CurrentFileInEditor?.data) {
			// @ts-expect-error data has the type 
			handleFileChange(CurrentFileInEditor.data);
		}
	}, [CurrentFileInEditor]);



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

