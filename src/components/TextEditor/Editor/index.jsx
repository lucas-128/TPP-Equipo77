import { useState, useEffect, useRef, useMemo } from "react";
import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";
import "./index.css";
import { typeSimulations } from "../../../interpreter/constants";

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

  const actualTypeSimulation = useSelector(
    (state) => state.application.typeSimulations
  );

  const isSimulating = useSelector((state) => state.application.isSimulating);

  const colorMapper = {
    "var(--im-green)": "green",
    "var(--im-pink)": "pink",
    "var(--im-yellow)": "yellow",
    "var(--im-blue)": "blue",
  };

  const fetchLine = useMemo(() => {
    if (fetchInstructionId === null) return null;
    return {
      number: fetchInstructionId + 1,
      color: colorMapper[fetchInstructionColor],
    };
  }, [fetchInstructionId, fetchInstructionColor]);

  const decodeLine = useMemo(() => {
    if (decodeInstructionId === null || decodeInstructionId === -1) {
      return null;
    }
    return {
      number: decodeInstructionId + 1,
      color: colorMapper[decodeInstructionColor],
    };
  }, [decodeInstructionId, decodeInstructionColor]);

  const executeLine = useMemo(() => {
    if (executeInstructionId === null || executeInstructionId === -1) return null;
    const executeLine = {
      number:
        actualTypeSimulation === typeSimulations.PIPELINING
          ? executeInstructionId + 1
          : executeInstructionId,
      color: colorMapper[executeInstructionColor],
    };
    return executeLine;
  }, [executeInstructionId]);

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

  const addLineDecoration = (line, decorations) => {
    if (line) {
      decorations.push({
        range: new monaco.Range(line.number, 1, line.number, 1),
        options: {
          isWholeLine: true,
          glyphMarginClassName: `fa fa-solid fa-arrow-right fa-xs glyph-margin-color-${line.color} glyph-margin`,
        },
      });
    }
  };

  const updateDecorations = () => {
    if (!editorRef.current) return;
    let newDecoration = [];
    addLineDecoration(fetchLine, newDecoration);
    addLineDecoration(decodeLine, newDecoration);
    addLineDecoration(executeLine, newDecoration);

    setDecorations(
      editorRef.current.deltaDecorations(decorations, newDecoration)
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
