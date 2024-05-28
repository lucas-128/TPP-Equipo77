// import React from "react";
import { useState } from "react";
import { TextEditor } from "../../components/TextEditor";
import { Container } from "./styled";

export const EditorSection = () => {
  const [text, setText] = useState("");
  return (
    <Container>
      <TextEditor />
    </Container>
  );
};
