import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  errorMessage: "",
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = true;
      state.errorMessage = action.payload;
    },
    closeError(state) {
      state.error = false;
      state.errorMessage = "";
    },
  },
});

export const { setError, closeError } = modalsSlice.actions;

export default modalsSlice.reducer;
