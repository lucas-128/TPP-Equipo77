import { useState, useEffect, useRef, useMemo } from "react";
import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";
import "./index.css";
import { typeSimulations } from "../../../interpreter/constants";
import { setErrorLine } from "../../../slices/applicationSlice";
import { useDispatch } from "react-redux";

export const MonacoEditor = ({ setEditorValue, editorValue }) => {
  const editorRef = useRef(null);
  const [decorations, setDecorations] = useState([]);
  const dispatch = useDispatch();
  const errorLine = useSelector((state) => state.application.execute.errorLine);
  const handleEditorChange = (value) => {
    if (errorLine) dispatch(setErrorLine(null));
    if (decorations.length > 0) updateDecorations([]);
    setEditorValue(value);
  };

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

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    updateDecorations();
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
    if (executeInstructionId === null || executeInstructionId === -1)
      return null;
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
    glyphMargin: isSimulating || errorLine !== null,
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

  useEffect(() => {
    if (errorLine && !isSimulating) {
      setDecorations(
        editorRef.current.deltaDecorations(decorations, [
          {
            range: new monaco.Range(errorLine + 1, 1, errorLine + 1, 1),
            options: {
              isWholeLine: true,
              className: "line-error-highlight",
              glyphMarginClassName: `fa fa-solid fa-times fa-xs glyph-margin-color-red glyph-margin`,
            },
          },
        ])
      );
    } else if (!isSimulating) {
      if (decorations.length > 0) {
        setDecorations(editorRef.current.deltaDecorations(decorations, []));
      }
    }
  }, [errorLine, isSimulating]);

  const updateDecorations = () => {
    if (!editorRef.current) return;
    let newDecoration = [];
    addLineDecoration(fetchLine, newDecoration);
    addLineDecoration(decodeLine, newDecoration);
    addLineDecoration(executeLine, newDecoration);
    if (!isSimulating) return;
    setDecorations(
      editorRef.current.deltaDecorations(decorations, newDecoration)
    );
  };

  useEffect(() => {
    if (!isSimulating) return;
    updateDecorations();
  }, [
    fetchInstructionId,
    decodeInstructionId,
    executeInstructionId,
    isSimulating,
  ]);

  return (
    <Editor
      height="100%"
      theme="vs-dark"
      value={editorValue}
      onChange={handleEditorChange}
      options={options}
      onMount={handleEditorDidMount}
    />
  );
};
