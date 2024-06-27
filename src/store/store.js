import { configureStore } from "@reduxjs/toolkit";
import editorTextReducer from "../slices/editorTextSlice";
import applicationReducer from "../slices/applicationSlice";

export const store = configureStore({
  reducer: {
    editorText: editorTextReducer,
    application: applicationReducer,
  },
});
