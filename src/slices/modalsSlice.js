import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: false,
  errorMessage: '',
  aluZoom: false,
  controlUnitZoom: false,
  mainMemoryModal: false,
  instructionsModal: false,
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = true;
      state.errorMessage = action.payload;
    },
    closeError(state) {
      state.error = false;
      state.errorMessage = '';
    },
    setOpenAluZoom(state, action) {
      state.aluZoom = action.payload;
    },
    setOpenMainMemoryModal(state, action) {
      state.mainMemoryModal = action.payload;
    },
    setOpenControlUnitZoom(state, action) {
      state.controlUnitZoom = action.payload;
    },
    setOpenInstructionsModal(state, action) {
      state.instructionsModal = action.payload;
    }
  },
});

export const {
  setError,
  closeError,
  setOpenAluZoom,
  setOpenMainMemoryModal,
  setOpenControlUnitZoom,
  setOpenInstructionsModal
} = modalsSlice.actions;

export default modalsSlice.reducer;
