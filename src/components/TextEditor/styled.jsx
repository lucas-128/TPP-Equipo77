import styled from "styled-components";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !["fullscreen"].includes(prop),
})`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: ${(props) => (props.fullscreen ? "fixed" : "relative")};
  top: 0;
  left: 0;
  width: ${(props) => (props.fullscreen ? "100%" : "auto")};
  height: ${(props) => (props.fullscreen ? "100%" : "auto")};
  z-index: ${(props) => (props.fullscreen ? "1000" : "auto")};
  background-color: ${(props) =>
    props.fullscreen ? "var(--im-white)" : "auto"};
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
  background-color: var(--im-white);
  padding: 2px;
  margin: 0px 5px;
  border-radius: 10px;
  flex: 20;
  overflow-y: scroll;
  max-height: 100%;
  height: 100%;
`;

export const ArrowColumn = styled.div`
  width: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  line-height: 20px;
  position: relative;
`;

export const Arrow = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["next", "selected", "lineIndex"].includes(prop),
})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${(props) => {
    if (props.selected) return "green";
    if (props.next) return "red";
    return "transparent";
  }};
  font-weight: bold;
  font-size: 20px;
  position: relative;
  top: ${(props) => props.lineIndex * 20}px;
`;

export const LineCounter = styled.div`
  width: 40px;
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
  margin-right: 5px;
`;

export const EditorText = styled.textarea`
  font-size: 16px;
  width: 100%;
  height: calc(100vh - 100px);
  border: none;
  background-color: var(--im-white);
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
  margin-top: 1.5px;
`;

export const EditorTextContainer = styled.div`
  flex: 1;
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
    background-color: var(--im-primary);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

export const HiddenEditorContainer = styled.div`
  padding: 2px;
  transition: all 0.15s;
`;
