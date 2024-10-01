// import React from "react";
import { useState, useEffect } from "react";
import { TextEditor } from "../../components/TextEditor";
import { TextEditorButtons } from "../../components/TextEditor/TextEditorButtons";

export const EditorSection = () => {
  // const [isSimulating, setIsSimulating] = useState(false);
  const [text, setText] = useState("");
  const [errorLine, setErrorLine] = useState(null);
  return (
    <TextEditor
      text={text}
      setText={setText}
      errorLine={errorLine}
      setErrorLine={setErrorLine}
    >
      <TextEditorButtons
        text={text}
        errorLine={errorLine}
        setErrorLine={setErrorLine}
      />
    </TextEditor>
  );
};
