"use client";
import React, { useRef, useEffect } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { useFileTree } from "../context/EditorContext";
import { extensionToLanguage } from "../data/FolderTree";
import toast from "react-hot-toast";
import axios from "axios";

export default function CodeEditor() {
    const { CurrentFileInEditor } = useFileTree();
    const editorRef = useRef(null);
    const monacoRef = useRef(null);
    const fetchAISuggestions = async (code: string, language: string) => {
        try {
            const res = await axios.post(
                process.env.BACKEND_BASEURL + "/api/code-complete",
                { codeSnippet: code, language },
                { withCredentials: true }
            );
            return res.data.completion; // string returned from backend
        } catch (err) {
            console.error(err);
            return "";
        }
    };
    // Handle editor mount
    {/* @ts-expect-error fils type need to be updated */ }
    const handleEditorDidMount = (editor, monaco: Monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;

        const model = editor.getModel();
        const language = model ? model.getLanguageId() : "javascript";

        monaco.languages.registerCompletionItemProvider(language, {
            triggerCharacters: [" ", ".", "(", ","], // common triggers

            // @ts-expect-error fils type need to be updated 
            provideCompletionItems: async (model) => {
                const code = model.getValue();
                const suggestion = await fetchAISuggestions(code, language);

                if (!suggestion) return { suggestions: [] };

                return {
                    suggestions: [
                        {
                            label: "AI Suggestion",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: suggestion,
                            range: undefined, // Monaco will insert at cursor
                        },
                    ],
                };
            },
        });
    };

    // Handle file changes
    useEffect(() => {

        // @ts-expect-error fils type need to be updated 
        if (!CurrentFileInEditor?.data || !editorRef.current || !monacoRef.current)
            return;


        // @ts-expect-error fils type need to be updated 
        const file = CurrentFileInEditor.data;

        // @ts-expect-error fils type need to be updated 
        editorRef.current.setValue(file.content);

        // @ts-expect-error fils type need to be updated 
        const model = editorRef.current.getModel();
        const fileName = file.FileExtenstion.split(".")[1];
        if (model) {
            const language = extensionToLanguage[fileName] || "javascript";

            // @ts-expect-error fils type need to be updated 
            monacoRef.current.editor.setModelLanguage(model, language);
        }
    }, [CurrentFileInEditor]);

    // Save shortcut (Ctrl+S / Cmd+S)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                updateDocumentContent();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    },);

    const updateDocumentContent = async () => {
        if (!editorRef.current) return;
        try {
            const res = await axios.put(
                "http://localhost:5000/api/doc/updateDocumentContent/",
                {

                    // @ts-expect-error fils type need to be updated 
                    contentId: CurrentFileInEditor?.data.id,

                    // @ts-expect-error fils type need to be updated 
                    newContent: editorRef.current.getValue(),
                },
                { withCredentials: true }
            );
            toast.success(res.data.message);
        } catch (error) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : "Something went wrong";
            toast.error(message);
        }
    };

    return (
        <div className="w-full h-screen">
            <Editor
                height="100%"
                defaultLanguage="javascript"
                defaultValue={`// Welcome to CodeSync\nfunction hello() { console.log("Hello, world!"); }`}
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
