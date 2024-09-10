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
  EditorHeader,
  EditorHeaderIconContainer,
  EditorWrapper,
  Button,
  Container,
  HiddenEditorContainer,
  EditorHeaderText,
} from "./styled";
import { setShowEditor } from "../../slices/editorTextSlice";
import { setError, setOpenInstructionsModal } from "../../slices/modalsSlice";
import { EditorTest } from "./Editor";
import { BsQuestionCircle, BsQuestionCircleFill } from "react-icons/bs";

export const TextEditor = ({ children, text, setText }) => {
  const isSimulating = useSelector((state) => state.application.isSimulating);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [history, setHistory] = useState([]);

  const show = useSelector((state) => state.editorText.show);
  const currentInstruction = useSelector(
    (state) =>
      state.application.execute.instructionId ||
      state.application.fetch.instructionId ||
      state.application.decode.instructionId
  );
  const fetchId = useSelector((state) => state.application.fetch.instructionId);
  const decodeId = useSelector(
    (state) => state.application.decode.instructionId
  );
  const executeId = useSelector(
    (state) => state.application.execute.instructionId
  );

  const dispatch = useDispatch();

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

  const handleFileDownload = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "programa.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getCurrentCycle = () => {
    if (decodeId !== null) return "DECODE";
    if (fetchId !== null) return "FETCH";
    if (executeId !== null) return "EXECUTE";
    return "";
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
  }, [isSimulating]);

  return show ? (
    <Container fullscreen={isFullScreen}>
      <EditorWrapper>
        <EditorHeader>
          <EditorHeaderText>
            {isSimulating && "ciclo " + getCurrentCycle()}
          </EditorHeaderText>
          <EditorHeaderIconContainer>
            {isSimulating ? (
              <></>
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
                <Button onClick={handleFileDownload} title="Descargar">
                  <MdDownload size={20} />
                </Button>
                <Button title="Ayuda" onClick={()=>dispatch(setOpenInstructionsModal(true))}>
                  <BsQuestionCircleFill size={18} />
                </Button>
              </>
            )}
            <Button onClick={() => dispatch(setShowEditor(!show))}>
              <MdArrowBackIosNew size={15} />
            </Button>
          </EditorHeaderIconContainer>
        </EditorHeader>
        <EditorTest editorValue={text} setEditorValue={setText} />

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
