// import React from "react";
import { useState, useEffect } from "react";
import { TextEditor } from "../../components/TextEditor";
import { TextEditorButtons } from "../../components/TextEditor/TextEditorButtons";

export const EditorSection = () => {
  // const [isSimulating, setIsSimulating] = useState(false);
  const [selectedLine, setSelectedLine] = useState(0);
  const [text, setText] = useState("");
  return (
    <TextEditor
      selectedLine={selectedLine}
      text={text}
      setText={setText}
    >
      <TextEditorButtons
        setSelectedLine={setSelectedLine}
        selectedLine={selectedLine}
        text={text}
      />
    </TextEditor>
  );
};
