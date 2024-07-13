import { configureStore } from "@reduxjs/toolkit";
import editorTextReducer from "../slices/editorTextSlice";
import applicationReducer from "../slices/applicationSlice";
import modalsReducer from "../slices/modalsSlice";

export const store = configureStore({
  reducer: {
    editorText: editorTextReducer,
    application: applicationReducer,
    modals: modalsReducer,
  },
});
