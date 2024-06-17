// import React from "react";
import { useState, useEffect } from "react";
import { TextEditor } from "../../components/TextEditor";
import { Container } from "./styled";
import { TextEditorButtons } from "../../components/TextEditorButtons";

export const EditorSection = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedLine, setSelectedLine] = useState(0);
  const [text, setText] = useState("");
  return (
    <Container>
      <TextEditor
        isSimulating={isSimulating}
        selectedLine={selectedLine}
        text={text}
        setText={setText}
      />
      <TextEditorButtons
        isSimulating={isSimulating}
        setIsSimulating={setIsSimulating}
        setSelectedLine={setSelectedLine}
        selectedLine={selectedLine}
        text={text}
      />
    </Container>
  );
};
