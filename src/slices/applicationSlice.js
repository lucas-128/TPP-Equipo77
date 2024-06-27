import { createSlice, current } from "@reduxjs/toolkit";
import {
  initialEdges,
  initialNodes,
} from "../containers/SimulatorSection/components";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";

const initialState = {
  registers: new Array(16).fill("-"),
  programCounter: "-",
  instructionRegister: "-",
  nodes: initialNodes,
  edges: initialEdges,
};

console.log("InitialNodes: ", initialNodes);

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
    updateNodeColor(state, action) {
      const { nodeId, color } = action.payload;
      state.nodes = state.nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, color };
        }
        return node;
      });
    },
    updateRegisters(state, action) {
      const { nodeId, registers } = action.payload;
      state.registers = registers;
      console.log("UPDATEANDO state", registers);
      current(state).nodes.forEach((node) => {
        console.log("NODE : ", node);
      });
      state.nodes = current(state).nodes.map((node) => {
        let newNode = { ...node };
        if (node.id === nodeId) {
          newNode.data = { ...node.data, registers };
        }
        return newNode;
      });
    },
  },

  // reducers: {
  //   setRegisters: (state, action) => {
  //     state.registers = action.payload;
  //   },
  //   setProgramCounter: (state, action) => {
  //     state.programCounter = action.payload;
  //   },
  //   setInstructionRegister: (state, action) => {
  //     state.instructionRegister = action.payload;
  //   },
  //   setNewState: (state, action) => {
  //     state = action.payload;
  //   },
  // },
});

export const {
  setNodes,
  setEdges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  updateRegisters,
} = applicationSlice.actions;

export default applicationSlice.reducer;
