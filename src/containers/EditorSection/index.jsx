// import React from "react";
import { useState } from "react";
import { TextEditor } from "../../components/TextEditor";
import { Container } from "./styled";
import { TextEditorButtons } from "../../components/TextEditorButtons";

export const EditorSection = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedLine, setSelectedLine] = useState(0);
  return (
    <Container>
      <TextEditor isSimulating={isSimulating} selectedLine={selectedLine} />
      <TextEditorButtons
        isSimulating={isSimulating}
        setIsSimulating={setIsSimulating}
        setSelectedLine={setSelectedLine}
      />
    </Container>
  );
};
