import styled from "styled-components";

export const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  border-radius: 10px;
  height: 100%;
`;

export const EditorHeader = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
  background-color: lightblue;
`;

export const EditorHeaderIconContainer = styled.div`
  display: flex;
`;

export const EditorHeaderText = styled.p`
  font-size: 14px;
  color: gray;
  user-select: none;
  margin: 0px;
`;

export const EditorTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f5f5f5;
  border-radius: 0 0 10px 10px;
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
  border: none;
  background-color: #f5f5f5;
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

