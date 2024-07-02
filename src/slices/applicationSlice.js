import { createSlice, current } from "@reduxjs/toolkit";
import {
  initialEdges,
  initialNodes,
} from "../containers/SimulatorSection/components";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";

const initialState = {
  registers: new Array(16).fill("-"),
  mainMemoryCells: new Array(31).fill("x").concat("00001000"), //Esto debe ser todo vacio, le puse el binario al final para hacer pruebas
  programCounter: "-",
  instructionRegister: "-",
  nodes: initialNodes,
  edges: initialEdges,
  previousState: null,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setNodes(state, action) {
      state.nodes = action.payload;
    },
    setEdges(state, action) {
      state.edges = action.payload;
    },
    onNodesChange(state, action) {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    onEdgesChange(state, action) {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect(state, action) {
      state.edges = addEdge(action.payload, state.edges);
    },
    updateRegisters(state, action) {
      const { nodeId, registers } = action.payload;
      state.registers = registers;
      state.nodes = current(state).nodes.map((node) => {
        let newNode = { ...node };
        if (node.id === nodeId) {
          newNode.data = { ...node.data, registers };
        }
        return newNode;
      });
    },
    updateMainMemoryCells(state, action) {
      const { nodeId, mainMemoryCells } = action.payload;
      state.mainMemoryCells = mainMemoryCells;
      state.nodes = current(state).nodes.map((node) => {
        let newNode = { ...node };
        if (node.id === nodeId) {
          newNode.data = { ...node.data, mainMemoryCells };
        }
        return newNode;
      });
    },
    goToPreviousState(state) {
      state.registers = current(state).previousState.registers;
      state.nodes = current(state).previousState.nodes;
      state.edges = current(state).previousState.edges;
      state.programCounter = current(state).previousState.programCounter;
      state.instructionRegister =
        current(state).previousState.instructionRegister;
      state.previousState = current(state).previousState.previousState;
    },
    updatePreviousState(state) {
      state.previousState = current(state);
    },
  },
});

export const {
  setNodes,
  setEdges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  updateRegisters,
  updateMainMemoryCells,
  goToPreviousState,
  updatePreviousState,
} = applicationSlice.actions;

export default applicationSlice.reducer;
