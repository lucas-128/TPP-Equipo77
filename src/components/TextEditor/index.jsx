import { useEffect } from "react";
import {
  MdOutlineFileUpload,
  MdArrowBackIosNew,
  MdArrowForwardIos,
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
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    try {
      if (file && file.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = (e) => {
          setText(e.target.result);
        };
        reader.readAsText(file);
      } else {
        alert("Please select a valid .txt file");
      }
    } catch (error) {
      console.log(error);
    }
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
  }, [isSimulating]);

  return show ? (
    <Container>
      <EditorWrapper>
        <EditorHeader>
          {/* <EditorHeaderText>Editor de texto</EditorHeaderText> */}
          <EditorHeaderIconContainer>
            <Button htmlFor="file-upload">
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
                  selected={isSimulating && i == selectedLine}
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
