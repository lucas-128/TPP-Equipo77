import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  errorMessage: "",
  aluZoom: false,
  mainMemoryModal: false,
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
    setOpenAluZoom(state, action) {
      state.aluZoom = action.payload;
    },
    setOpenMainMemoryModal(state, action) {
      state.mainMemoryModal = action.payload;
    },
  },
});

export const { setError, closeError, setOpenAluZoom , setOpenMainMemoryModal } = modalsSlice.actions;

export default modalsSlice.reducer;
