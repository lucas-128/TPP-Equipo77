import { configureStore } from "@reduxjs/toolkit";
import editorTextReducer from "../slices/editorTextSlice";

export const store = configureStore({
  reducer: {
    editorText: editorTextReducer,
  },
});
