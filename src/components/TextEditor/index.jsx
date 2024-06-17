import { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
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
} from "./styled";

export const TextEditor = ({ isSimulating, selectedLine }) => {
  const [text, setText] = useState("");

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
  }, [isSimulating]);
  return (
    <EditorWrapper>
      <EditorHeader>
        <EditorHeaderText>Editor de texto</EditorHeaderText>
        <EditorHeaderIconContainer>
          <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
            <MdOutlineFileUpload size={20} />
          </label>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            accept=".txt"
            onChange={handleFileUpload}
          />
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
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </EditorTextContainer>
      </EditorTextWrapper>
    </EditorWrapper>
  );
};
