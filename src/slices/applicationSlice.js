import { createSlice, current } from "@reduxjs/toolkit";
import {
  initialEdges,
  initialNodes,
} from "../containers/SimulatorSection/components";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";
import { CACHE_SIZE } from "../interpreter/constants";

// LOS VALORES SE GUARDAN EN HEXADECIMAL
export const initialState = {
  fetch: {
    instructionId: null,
    address: null,
    edgeAnimation: [],
    programCounter: null,
    instructionRegister: "-",
  },
  decode: {
    instructionId: null,
  },
  execute: {
    instructionId: null,
    registers: new Array(16).fill(null),
    //TODO: capaz la memoria se puede mover afuera
    mainMemoryCells: new Array(256).fill("-"),
    cacheMemoryCells: new Array(CACHE_SIZE).fill(null),
    nodes: initialNodes,
    edges: initialEdges,
    aluOperation: null,
    edgeAnimation: [],
  },
  previousState: null,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setNodes(state, action) {
      state.execute.nodes = action.payload;
    },
    setEdges(state, action) {
      state.execute.edges = action.payload;
    },
    onNodesChange(state, action) {
      state.execute.nodes = applyNodeChanges(
        action.payload,
        state.execute.nodes
      );
    },
    onEdgesChange(state, action) {
      state.execute.edges = applyEdgeChanges(
        action.payload,
        state.execute.edges
      );
    },
    onConnect(state, action) {
      state.execute.edges = addEdge(action.payload, state.execute.edges);
    },
    updateExecuteState(state, action) {
      state.execute = action.payload;
    },
    updateDecodeState(state, action) {
      state.decode = action.payload;
    },
    updateFetchState(state, action) {
      state.fetch = action.payload;
    },
    getProgramInMemory(state, action) {
      const text = action.payload;
      const parsedCode = splitCode(text).join("");
      if (parsedCode.length > 512) {
        // TODO: ERROR => el programa no entra en memoria
      }
      state.execute.mainMemoryCells = Array.from(
        { length: 256 },
        (_, i) => parsedCode.slice(i * 2, i * 2 + 2) || "x"
      );
    },
    updateInstructionRegister(state, action) {
      const { instructionRegister } = action.payload;
      state.execute.instructionRegister = instructionRegister;
    },
    updateProgramCounter(state, action) {
      const { programCounter } = action.payload;
      state.execute.programCounter = programCounter;
    },
    goToPreviousState(state) {
      state.execute.registers = current(state).previousstate.execute.registers;
      state.execute.nodes = current(state).previousstate.execute.nodes;
      state.execute.edges = current(state).previousstate.execute.edges;
      state.execute.programCounter =
        current(state).previousstate.execute.programCounter;
      state.execute.edgeAnimation =
        current(state).previousstate.execute.edgeAnimation;
      state.execute.instructionRegister =
        current(state).previousstate.execute.instructionRegister;
      state.execute.previousState =
        current(state).previousstate.execute.previousState;
    },
    updatePreviousState(state) {
      state.previousState = current(state);
    },
    clearApplication(state) {
      state.execute = initialState.execute;
      state.decode = initialState.decode;
      state.fetch = initialState.fetch;
    },
  },
});

export const {
  setNodes,
  setEdges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  updateExecuteState,
  updateDecodeState,
  updateFetchState,
  getProgramInMemory,
  goToPreviousState,
  updatePreviousState,
  clearApplication,
} = applicationSlice.actions;

// Thunk para manejar la actualización del estado actual
export const updateCurrentState = (newState) => (dispatch) => {
  dispatch(updateExecuteState(newState.execute));
  dispatch(updateDecodeState(newState.decode));
  dispatch(updateFetchState(newState.fetch));
};

export default applicationSlice.reducer;
