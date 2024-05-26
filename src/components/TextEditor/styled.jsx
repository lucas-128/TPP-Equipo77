import styled from "styled-components";

export const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 40px;
  margin-bottom: 40px;
`;

export const Editor = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: 13px;
  padding: 1rem;
  border: none;
  background-color: #f5f5f5;
  color: black;
  font-family: "Courier New", Courier, monospace;
`;