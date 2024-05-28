import styled from "styled-components";

export const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
`;

export const Editor = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: 14px;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 10px;
  background-color: #f5f5f5;
  color: black;
  font-family: "Courier New", Courier, monospace;
`;