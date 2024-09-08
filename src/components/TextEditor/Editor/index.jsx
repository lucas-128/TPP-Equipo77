import { useState, useEffect, useRef, useMemo } from "react";
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
  const fetchInstructionId = useSelector(
    (state) => state.application.fetch.instructionId
  );

  const decodeInstructionId = useSelector(
    (state) => state.application.decode.instructionId
  );

  const executeInstructionId = useSelector(
    (state) => state.application.execute.instructionId
  );

  const fetchInstructionColor = useSelector(
    (state) => state.application.fetch.color
  );

  const decodeInstructionColor = useSelector(
    (state) => state.application.decode.color
  );

  const executeInstructionColor = useSelector(
    (state) => state.application.execute.color
  );

  console.log(
    "EL fetchInstructionId",
    fetchInstructionId,
    "EL decodeInstructionId",
    decodeInstructionId,
    "EL executeInstructionId",
    executeInstructionId
  );

  const isSimulating = useSelector((state) => state.application.isSimulating);

  const colorMapper = {
    "var(--im-green)": "green",
    "var(--im-pink)": "pink",
    "var(--im-yellow)": "yellow",
    "var(--im-blue)": "blue",
  };

  const line = useMemo(() => {
    return fetchInstructionId
      ? { number: fetchInstructionId, color: colorMapper[fetchInstructionColor] }
      : decodeInstructionId
      ? { number: decodeInstructionId, color: colorMapper[decodeInstructionColor] }
      : {
          number:
            executeInstructionId !== null && executeInstructionId > 0
              ? executeInstructionId - 1
              : 0,
          color: colorMapper[executeInstructionColor],
        };
  }, [fetchInstructionId, decodeInstructionId, executeInstructionId]);

  //TODO: Sacar el line y usar los tres objetos en el option del decoration. En caso de que el id no sea null, mostrar la flecha

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
    const lineNumber = line.number + 1;
    const newDecorations = [
      {
        range: new monaco.Range(lineNumber, 1, lineNumber, 1),
        options: {
          isWholeLine: true,
          glyphMarginClassName: `fa fa-solid fa-arrow-right fa-xs glyph-margin-color-${line.color}`,
        },
      },
    ];

    setDecorations(
      editorRef.current.deltaDecorations(decorations, newDecorations)
    );
  };

  useEffect(() => {
    updateDecorations();
  }, [fetchInstructionId, decodeInstructionId, executeInstructionId]);

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
