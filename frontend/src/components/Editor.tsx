// CodeEditor.jsx
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue={`// Welcome to your VS Code-like editor\nfunction hello() {\n  console.log("Hello, world!");\n}`}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        wordWrap: "on",
        automaticLayout: true,
      }}
    />
  );
}

