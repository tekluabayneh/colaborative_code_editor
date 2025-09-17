"use client";
import React, { useRef, useEffect, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { useFileTree } from "../context/EditorContext";
import { extensionToLanguage } from "../data/FolderTree";
import toast from "react-hot-toast";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { WebsocketProvider } from "y-websocket";

import { MonacoBinding } from "y-monaco";

const GEMINI_API_KEY = process.env.YOUR_API_KEY_HERE;
type UserType = {
  invitedBy: string;
  role: string;
  userName: string;
  _id: string;
};
// const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
export default function CodeEditor() {
  const [email, setemail] = useState("");
  const [user, setUser] = useState<UserType | null>(null);
  const { CurrentFileInEditor } = useFileTree();
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  useEffect(() => {
    const getEmail = localStorage.getItem("email");
    if (!getEmail) return;
    setemail(getEmail);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) return;
      try {
        const res = await axios.post(
          "http://localhost:5000/api/User/getProfile",
          { email },
          { withCredentials: true }
        );
        console.log(res);
        const userData =
          res.data?.IsRoleUser?.Users_user ||
          res.data?.IsRoleUser?.Owners_user ||
          null;
        setUser(userData);
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchProfile();
  }, [email]);
  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    const model = editorRef.current.getModel();

    if (!user) {
      return;
    }
    /////===========yjs==================///
    // initialize yjs
    const doc = new Y.Doc();
    // set up the provider
    const provider = new WebsocketProvider(
      "ws://localhost:1234",
      user.invitedBy ? user.invitedBy : user._id,
      doc
    );

    provider.on("status", (event) => {
      console.log("Connection status:", event.status);
    });
    provider.awareness.setLocalStateField("user", {
      name: user.userName,
      color: "#ff0000",
      // cursor: editor.getPosition(),
    });
    editor.onDidChangeCursorSelection((e) => {
      provider.awareness.setLocalStateField("selection", {
        start: e.selection.getStartPosition(),
        end: e.selection.getEndPosition(),
      });
    });

    // get the monaco editor
    const type = doc.getText("monaco");

    // bind the editor with the yjs
    const binding = new MonacoBinding(
      type,
      model,
      new Set([editorRef.current]),
      provider.awareness
    );
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

// const language = model?.getLanguageId() || "javascript";
// Replace this function inside your existing CodeEditor

// // Fake streaming for demo using Google GenAI
// async function* aiStream(prompt: string) {
//   const response = await client.responses.create({
//     model: "models/text-bison-001", // GenAI model
//     input: prompt,
//     temperature: 0.2,
//     maxOutputTokens: 100,
//   });

//   // Extract the text from GenAI response
//   const text = response.output[0].content[0].text;

//   for (let i = 0; i < text.length; i++) {
//     await new Promise((r) => setTimeout(r, 20)); // simulate streaming
//     yield text[i];
//   }
// }

// // Then in your existing useEffect for inline suggestions
// useEffect(() => {
//   if (!editorRef.current || !monacoRef.current) return;

//   const model = editorRef.current.getModel();
//   const language = model?.getLanguageId() || "javascript";

//   const disposable =
//     monacoRef.current.editor.registerInlineCompletionsProvider(language, {
//       provideInlineCompletions: async (model, position) => {
//         const before = model.getValueInRange({
//           startLineNumber: 1,
//           startColumn: 1,
//           endLineNumber: position.lineNumber,
//           endColumn: position.column,
//         });

//         let suggestionText = "";
//         for await (const chunk of aiStream(before)) {
//           suggestionText += chunk;
//         }

//         return {
//           items: [
//             {
//               insertText: suggestionText,
//               range: {
//                 startLineNumber: position.lineNumber,
//                 startColumn: position.column,
//                 endLineNumber: position.lineNumber,
//                 endColumn: position.column,
//               },
//             },
//           ],
//           dispose() {},
//         };
//       },
//       freeInlineCompletions: () => {},
//     });

//   return () => disposable?.dispose();
// }, [editorRef.current, monacoRef.current]);
