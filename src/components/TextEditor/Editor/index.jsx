import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";
import "./index.css";

export const EditorTest = ({ setEditorValue, editorValue }) => {
  const editorRef = useRef(null);
  const [decorations, setDecorations] = useState([]);

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    updateDecorations();
  };

  //Tomar los ids y ver cual no es null para ver cual no es null

  //Pipelining traer los ids de los 3 y los colores
  const selectedLine =
    useSelector((state) => state.application.fetch.programCounter) / 2 - 1;

  const isSimulating = useSelector((state) => state.application.isSimulating);

  const options = {
    selectOnLineNumbers: true,
    lineNumbers: (lineNumber) => {
      return ((lineNumber - 1) * 2).toString(16).padStart(2, "0");
    },
    lineNumbersMinChars: 3,
    lineDecorationsWidth: "0px",
    minimap: { enabled: false },
    glyphMargin: isSimulating,
    readOnly: isSimulating,
  };

  const updateDecorations = () => {
    if (!editorRef.current) return;
    const lineNumber = Math.floor(selectedLine) + 1;
    const newDecorations = [
      {
        range: new monaco.Range(lineNumber, 1, lineNumber, 1),
        options: {
          isWholeLine: true,
          glyphMarginClassName: "fa fa-solid fa-arrow-right fa-xs",
        },
      },
    ];

    setDecorations(
      editorRef.current.deltaDecorations(decorations, newDecorations)
    );
  };

  useEffect(() => {
    updateDecorations();
  }, [selectedLine]);

  return (
    <>
      <Editor
        height="100%"
        theme="vs-dark"
        value={editorValue}
        onChange={handleEditorChange}
        options={options}
        onMount={handleEditorDidMount}
      />
    </>
  );
};
