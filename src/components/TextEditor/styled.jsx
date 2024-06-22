import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1.5;
  flex-direction: column;
  border-right: 2px solid var(--im-gray);
`;

export const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  height: 100%;
  background-color: var(--im-gray);
  transition: all 0.15s;
`;

export const EditorHeader = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: flex-end;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  z-index: 1;
`;

export const EditorHeaderIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const EditorHeaderText = styled.p`
  font-size: 14px;
  color: black;
  user-select: none;
  margin: 0px;
`;

export const EditorTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #eeeded;
  padding: 2px;
  margin: 0px 5px;
  border-radius: 10px;
  flex: 20;
  overflow-y: scroll;
  max-height: 100%;
  height: 100%;
`;

export const LineCounter = styled.div`
  width: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  line-height: 20px;
  user-select: none;
  height: 100%;
`;

export const LineCounterText = styled.p`
  font-size: 10px;
  color: black;
  margin: 0px;
`;

export const LineNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: black;
  background-color: ${(props) => (props.isSelected ? "#d7d7d7" : "")};
  margin-right: 5px;
`;

export const EditorText = styled.textarea`
  font-size: 12px;
  width: 100%;
  height: calc(100vh - 100px);
  border: none;
  background-color: #eeeded;
  padding: 0px;
  border-radius: 0 0 10px 0;
  color: black;
  font-family: "Courier New", Courier, monospace;
  resize: none;
  box-shadow: none;
  outline: none;
  line-height: 20px;
  tab-size: 4;
  white-space: pre;
  overflow-y: hidden;
`;

export const EditorTextContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
`;

export const Button = styled.label`
  height: 20px;
  width: 20px;
  color: var(--im-lightgray);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  padding: 2px;
  transition: all 0.15s;

  &:hover {
    background-color: var(--im-gray-lighter);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

export const HiddenEditorContainer = styled.div`
  padding: 2px;
  transition: all 0.15s;
`;
