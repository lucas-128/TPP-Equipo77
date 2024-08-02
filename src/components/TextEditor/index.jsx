import React from "react";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import {
  MdOutlineFileUpload,
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdDelete,
  MdFullscreen,
  MdFullscreenExit,
  MdUndo,
  MdDownload,
} from "react-icons/md";
import { TiArrowRightThick } from "react-icons/ti";
import { SpinnerContainer, SpinnerText } from "./styled"; // Adjust the path as needed
import { useDispatch, useSelector } from "react-redux";
import { validateSyntax } from "../../interpreter/main";
import {
  EditorText,
  EditorHeader,
  EditorHeaderIconContainer,
  EditorWrapper,
  EditorTextWrapper,
  LineCounter,
  LineNumber,
  EditorTextContainer,
  Button,
  Container,
  HiddenEditorContainer,
  Arrow,
  ArrowColumn,
} from "./styled";
import { setShowEditor } from "../../slices/editorTextSlice";
import { setError } from "../../slices/modalsSlice";

export const TextEditor = ({ children, isSimulating, text, setText }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [history, setHistory] = useState([]);
  const show = useSelector((state) => state.editorText.show);
  const programCounter = useSelector(
    (state) => state.application.programCounter
  );
  const dispatch = useDispatch();
  const [lines, setLines] = useState([]);

  const getLineNumbers = () => {
    return Array.from({ length: 128 }, (_, i) =>
      (i * 2).toString(16).padStart(2, "0")
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd, value } = e.target;
      const newValue =
        value.substring(0, selectionStart) +
        "\t" +
        value.substring(selectionEnd);
      setText(newValue);
    } else if (e.ctrlKey && e.key === "z") {
      handleUndo();
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
        setHistory((prevHistory) => [...prevHistory, e.target.result]);
        event.target.value = null;
      };
      reader.onerror = () => {
        dispatch(setError("Error reading file."));
      };
      reader.readAsText(file);
    } else {
      dispatch(setError("Please select a valid .txt file."));
    }
  };

  const handleClearText = () => {
    if (!isSimulating) {
      setHistory((prevHistory) => [...prevHistory, text]);
      setText("");
    } else {
      // no se puede editar el codigo mientras se simula
    }
  };

  const handleFullScreenToggle = () => {
    if (!isSimulating) {
      setIsFullScreen(!isFullScreen);
    }
  };

  const handleUndo = () => {
    if (!isSimulating) {
      setHistory((prevHistory) => {
        if (prevHistory.length > 1) {
          const previousText = prevHistory[prevHistory.length - 2];
          setText(previousText);
          return prevHistory.slice(0, -2);
        }
        return prevHistory;
      });
    } else {
      // no se puede editar el codigo mientras se simula
    }
  };

  const handleFileDownload = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "programa.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!text || !isSimulating) return;
    if (!validateSyntax(text) && isSimulating) {
      dispatch(
        setError(
          "El código contiene errores de sintáxis, por favor modifíquelo e intente de nuevo"
        )
      );
    }

    if (isSimulating) {
      setIsFullScreen(false);
    }
  }, [isSimulating, text, selectedLine, dispatch]);

  useEffect(() => {
    setLines(text.split("\n"));
    if (text !== history[history.length - 1]) {
      setHistory((prevHistory) => [...prevHistory, text]);
    }
  }, [text]);

  const branchLinesMap = new Map();
  getLineNumbers().forEach((_, i) => {
    if (/^B/i.test(lines[i])) {
      let hexLineNumber = lines[i].slice(2, 4);
      let targetLine = parseInt(hexLineNumber, 16);
      branchLinesMap.set(i, targetLine / 2);
    }
  });

  return show ? (
    <Container fullscreen={isFullScreen}>
      <EditorWrapper>
        <EditorHeader>
          <EditorHeaderIconContainer>
            {isSimulating ? (
              <SpinnerContainer>
                <SpinnerText>Ejecutando código...</SpinnerText>
                <ClipLoader size={16} color={"#FFFFFF"} />
              </SpinnerContainer>
            ) : (
              <>
                <Button htmlFor="file-upload" title="Subir archivo">
                  <MdOutlineFileUpload size={20} />
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                  accept=".txt"
                  onChange={handleFileUpload}
                  disabled={isSimulating}
                />
                <Button onClick={handleClearText} title="Borrar">
                  <MdDelete size={20} />
                </Button>
                <Button
                  onClick={handleFullScreenToggle}
                  title="Pantalla completa"
                >
                  {isFullScreen ? (
                    <MdFullscreenExit size={20} />
                  ) : (
                    <MdFullscreen size={20} />
                  )}
                </Button>
                <Button onClick={handleUndo} title="Deshacer">
                  <MdUndo size={20} />
                </Button>
                <Button onClick={handleFileDownload} title="Descargar">
                  <MdDownload size={20} />
                </Button>
              </>
            )}
            <Button onClick={() => dispatch(setShowEditor(!show))}>
              <MdArrowBackIosNew size={15} />
            </Button>
          </EditorHeaderIconContainer>
        </EditorHeader>

        <EditorTextWrapper>
          <ArrowColumn>
            {getLineNumbers().map((_, i) => {
              const isBranchTarget =
                isSimulating &&
                branchLinesMap.has(selectedLine) &&
                ((i < selectedLine &&
                  i === branchLinesMap.get(selectedLine) - 1) ||
                  (i >= selectedLine &&
                    i === branchLinesMap.get(selectedLine) - 2));

              let isSelected = isSimulating && i === selectedLine;

              if (
                lines[selectedLine] &&
                /^B/i.test(lines[selectedLine]) &&
                branchLinesMap.get(selectedLine) < selectedLine
              ) {
                isSelected = isSimulating && i === selectedLine - 1;
              }

              return (
                <React.Fragment key={i}>
                  <Arrow selected={isSelected}>
                    <TiArrowRightThick size={20} />
                  </Arrow>

                  {isSelected &&
                    isSimulating &&
                    lines[i] &&
                    !/^C/i.test(lines[i]) && (
                      <Arrow next>
                        <TiArrowRightThick size={20} />
                      </Arrow>
                    )}

                  {isBranchTarget && (
                    <Arrow next>
                      <TiArrowRightThick size={20} />
                    </Arrow>
                  )}
                </React.Fragment>
              );
            })}
          </ArrowColumn>
          <LineCounter>
            {getLineNumbers().map((lineNumber, i) => (
              <LineNumber key={lineNumber}>{lineNumber}</LineNumber>
            ))}
          </LineCounter>
          <EditorTextContainer>
            <EditorText
              disabled={isSimulating}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              readOnly={isSimulating}
            />
          </EditorTextContainer>
        </EditorTextWrapper>
        {children}
      </EditorWrapper>
    </Container>
  ) : (
    <EditorWrapper>
      <HiddenEditorContainer>
        <Button onClick={() => dispatch(setShowEditor(!show))}>
          <MdArrowForwardIos size={15} />
        </Button>
      </HiddenEditorContainer>
    </EditorWrapper>
  );
};
