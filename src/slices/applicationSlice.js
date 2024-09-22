import { createSlice, current } from "@reduxjs/toolkit";
import {
  initialEdges,
  initialNodes,
} from "../containers/SimulatorSection/components";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";
import { CACHE_SIZE, typeSimulations } from "../interpreter/constants";

// LOS VALORES SE GUARDAN EN HEXADECIMAL
export const initialState = {
  fetch: {
    instructionId: null,
    address: null,
    edgeAnimation: [],
    programCounter: null,
    instructionRegister: "-",
    color: "var(--im-yellow)",
  },
  decode: {
    instructionId: null,
    color: "var(--im-pink)",
    programCounter: null,
    instructionRegister: "-",
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
    showInputPort: false,
    endProgram: false,
    color: "var(--im-green)",
  },
  previousState: null,
  // TODO: Agregar a execute
  aluOperation: null,
  edgeAnimation: [],
  isSimulating: false,
  typeSimulations: typeSimulations.SIMPLE,
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
    updateMainMemoryCells(state, action) {
      state.execute.mainMemoryCells = action.payload;
    },
    setShowInputPort(state, action) {
      state.execute.showInputPort = action.payload;
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
      if (!state.previousState) {
        state.previousState = null;
        state.isSimulating = false;
        state.execute = initialState.execute;
        state.decode = initialState.decode;
        state.fetch = initialState.fetch;
        state.edgeAnimation = initialState.edgeAnimation;
      } else {
        state.execute = state.previousState.execute;
        state.decode = state.previousState.decode;
        state.fetch = state.previousState.fetch;
        state.previousState = state.previousState.previousState;
      }
    },
    goToFistState(state) {
      let oldState = current(state);
      while (oldState.previousState) {
        oldState = oldState.previousState;
        state.execute = oldState.execute;
        state.decode = oldState.decode;
        state.fetch = oldState.fetch;
        state.previousState = oldState.previousState;
      }
    },
    updatePreviousState(state) {
      state.previousState = current(state);
    },
    clearApplication(state) {
      state.execute = initialState.execute;
      state.decode = initialState.decode;
      state.fetch = initialState.fetch;
      state.edgeAnimation = initialState.edgeAnimation;
      state.previousState = null;
    },
    updateTypeSimulation(state, action) {
      state.typeSimulations = action.payload;
    },
    setIsSimulating(state, action) {
      state.isSimulating = action.payload;
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
  setShowInputPort,
  updateMainMemoryCells,
  updateTypeSimulation,
  setIsSimulating,
  goToFistState,
} = applicationSlice.actions;

// Thunk para manejar la actualización del estado actual
export const updateCurrentState = (newState) => (dispatch) => {
  dispatch(updateExecuteState(newState.execute));
  dispatch(updateDecodeState(newState.decode));
  dispatch(updateFetchState(newState.fetch));
};

export default applicationSlice.reducer;
