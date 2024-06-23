import { useEffect, useState } from "react";
import {
  MdOutlineFileUpload,
  MdArrowBackIosNew,
  MdArrowForwardIos,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { processCode } from "../../interpreter/main";
import {
  EditorText,
  EditorHeader,
  EditorHeaderIconContainer,
  EditorHeaderText,
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

  useEffect(() => console.log("Selected line: ", selectedLine), [selectedLine]);

  useEffect(() => {
    console.log("Is simulating: ", isSimulating);
    if (text && isSimulating) processCode(text);
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
                  isSelected={isSimulating && i == selectedLine}
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
