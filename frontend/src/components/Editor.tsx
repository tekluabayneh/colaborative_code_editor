import React, { useRef, useEffect } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { useFileTree } from "../context/EditorContext";
import { extensionToLanguage } from "../data/FolderTree";
import toast from "react-hot-toast";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.YOUR_API_KEY_HERE;

const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
export default function CodeEditor() {
  const { CurrentFileInEditor } = useFileTree();
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    const model = editorRef.current.getModel();
    const language = model?.getLanguageId() || "javascript";
    // Replace this function inside your existing CodeEditor

    // Fake streaming for demo using Google GenAI
    async function* aiStream(prompt: string) {
      const response = await client.responses.create({
        model: "models/text-bison-001", // GenAI model
        input: prompt,
        temperature: 0.2,
        maxOutputTokens: 100,
      });

      // Extract the text from GenAI response
      const text = response.output[0].content[0].text;

      for (let i = 0; i < text.length; i++) {
        await new Promise((r) => setTimeout(r, 20)); // simulate streaming
        yield text[i];
      }
    }

    // Then in your existing useEffect for inline suggestions
    useEffect(() => {
      if (!editorRef.current || !monacoRef.current) return;

      const model = editorRef.current.getModel();
      const language = model?.getLanguageId() || "javascript";

      const disposable =
        monacoRef.current.editor.registerInlineCompletionsProvider(language, {
          provideInlineCompletions: async (model, position) => {
            const before = model.getValueInRange({
              startLineNumber: 1,
              startColumn: 1,
              endLineNumber: position.lineNumber,
              endColumn: position.column,
            });

            let suggestionText = "";
            for await (const chunk of aiStream(before)) {
              suggestionText += chunk;
            }

            return {
              items: [
                {
                  insertText: suggestionText,
                  range: {
                    startLineNumber: position.lineNumber,
                    startColumn: position.column,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column,
                  },
                },
              ],
              dispose() {},
            };
          },
          freeInlineCompletions: () => {},
        });

      return () => disposable?.dispose();
    }, [editorRef.current, monacoRef.current]);
  };

  const handleFileChange = (file: {
    FileExtenstion: string;
    content: string;
  }) => {
    if (!file) return;
    if (!editorRef.current || !monacoRef.current) return;
    editorRef.current.setValue(file.content);
    const model = editorRef.current.getModel();
    const fileName = file.FileExtenstion.split(".")[1];
    if (model) {
      const language = extensionToLanguage[fileName] || "javascript";
      monacoRef.current.editor.setModelLanguage(
        editorRef.current.getModel(),
        language
      );
    }
  };

  useEffect(() => {
    // @ts-expect-error data has the type
    if (CurrentFileInEditor?.data) {
      // @ts-expect-error data has the type
      handleFileChange(CurrentFileInEditor.data);
    }
  }, [CurrentFileInEditor]);

  ///////////////////////////////=====================================================//////////////////////////
  const updateDocumentContent = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/doc/updateDocumentContent/",
        {
          // @ts-expect-error data has the type
          contentId: CurrentFileInEditor?.data.id,
          newContent: editorRef.current.getValue(),
        },
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        toast.error(message);
      }
    }
  };

  const useSaveShortcut = (onSave: () => void) => {
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
          e.preventDefault();
          onSave();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onSave]);
  };
  useSaveShortcut(updateDocumentContent);

  return (
    <div className="w-full h-screen">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue={`// Welcome to CodeSync - your VS Code-like editor with AI-assisted coding (like Copilot)
// You can create folders and files from the sidebar and start coding right here.

// Example: simple hello function
function hello() {
  console.log("Hello, world!");
}

// Tip: Use Ctrl+S to save your work
// Explore creating new files or folders to organize your code!
`}
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
