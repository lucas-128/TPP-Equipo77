import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  instruction: "",
};

export const editorTextSlice = createSlice({
  name: "editorText",
  initialState,
  reducers: {
    setNewInstruction: (state, action) => {
      console.log("action", action.payload);
      state.instruction = action.payload;
    },
  },
});

export const { setNewInstruction } = editorTextSlice.actions;

export default editorTextSlice.reducer;
