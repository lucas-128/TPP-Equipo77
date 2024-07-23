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
  LineCounterText,
  EditorTextContainer,
  Button,
  Container,
  HiddenEditorContainer,
} from "./styled";
import { setShowEditor } from "../../slices/editorTextSlice";
import { setError } from "../../slices/modalsSlice";

export const TextEditor = ({
  children,
  isSimulating,
  selectedLine,
  text,
  setText,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [history, setHistory] = useState([]);
  //const [fontSize, setFontSize] = useState(16);
  const show = useSelector((state) => state.editorText.show);
  const dispatch = useDispatch();

  const getLineNumbers = (text) => {
    const lines = text.split("\n").length;
    return Array.from({ length: lines }, (_, i) =>
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
    setHistory((prevHistory) => [...prevHistory, text]);
    setText("");
  };

  const handleFullScreenToggle = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleUndo = () => {
    setHistory((prevHistory) => {
      if (prevHistory.length > 1) {
        const previousText = prevHistory[prevHistory.length - 2];
        setText(previousText);
        return prevHistory.slice(0, -2);
      }
      return prevHistory;
    });
  };

  const handleDownload = () => {
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
    if (!validateSyntax(text, selectedLine) && isSimulating) {
      dispatch(
        setError(
          "El código contiene errores de sintáxis, por favor modifíquelo e intente de nuevo"
        )
      );
    }
  }, [isSimulating, text, selectedLine, dispatch]);

  useEffect(() => {
    if (text !== history[history.length - 1]) {
      setHistory((prevHistory) => [...prevHistory, text]);
    }
  }, [text]);

  return show ? (
    <Container fullscreen={isFullScreen}>
      <EditorWrapper>
        <EditorHeader>
          <EditorHeaderIconContainer>
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
            <Button onClick={handleFullScreenToggle} title="Pantalla completa">
              {isFullScreen ? (
                <MdFullscreenExit size={20} />
              ) : (
                <MdFullscreen size={20} />
              )}
            </Button>
            <Button onClick={handleUndo} title="Deshacer">
              <MdUndo size={20} />
            </Button>
            <Button onClick={handleDownload} title="Descargar">
              <MdDownload size={20} />
            </Button>
            <Button onClick={() => dispatch(setShowEditor(!show))}>
              <MdArrowBackIosNew size={15} />
            </Button>
          </EditorHeaderIconContainer>
        </EditorHeader>
        <EditorTextWrapper>
          <EditorTextContainer>
            <LineCounter>
              {getLineNumbers(text).map((lineNumber, i) => (
                <LineNumber
                  key={lineNumber}
                  selected={isSimulating && i === selectedLine}
                >
                  <LineCounterText>{lineNumber}</LineCounterText>
                </LineNumber>
              ))}
            </LineCounter>
            <EditorText
              disabled={isSimulating}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              readOnly={isSimulating}
              //style={{ fontSize: `${fontSize}px` }}
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
