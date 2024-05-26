import { useState } from "react";
import { Editor, EditorWrapper } from "./styled";

export const TextEditor = () => {
    const [text, setText] = useState("");

  return (
    <EditorWrapper>
      <Editor value={text} onChange={(e) => setText(e.target.value)} />
    </EditorWrapper>
  );
};
