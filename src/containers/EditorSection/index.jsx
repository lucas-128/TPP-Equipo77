// import React from "react";
import { TextEditor } from "../../components/TextEditor";

export const EditorSection = () => {
    return (
        <div style={{display: "flex", flex: 1, flexDirection: "column"}}>
        <h1>Editor</h1>
        <TextEditor />
        </div>
    );
}