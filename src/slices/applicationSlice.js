import { createSlice, current } from "@reduxjs/toolkit";
import {
  aluId,
  controlUnitId,
  initialEdges,
  initialNodes,
  mainMemoryId,
  registersId,
  registerAluTopId,
  registerAluBottomId,
  aluRegistersId,
} from "../containers/SimulatorSection/components";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";

const initialState = {
  registers: new Array(16).fill("-"),
  mainMemoryCells: new Array(31)
    .fill("-")
    .concat("00001000") //Esto debe ser todo vacio, le puse el binario al final para hacer pruebas
    .concat(new Array(224).fill("-")),
  programCounter: "-",
  instructionRegister: "-",
  nodes: initialNodes,
  edges: initialEdges,
  previousState: null,
  aluOperation: null,
  edgeAnimation: {
    registerAluTop: false,
    registerAluBottom: false,
    registerCache: false,
    aluRegisters: false,
    cacheRegisters: false,
  },
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
      const { registers } = action.payload;
      state.registers = registers;
    },
    updateMainMemoryCells(state, action) {
      const { mainMemoryCells } = action.payload;
      state.mainMemoryCells = mainMemoryCells;
    },
    updateEdgeAnimation(state, action) {
      const { edgeAnimation } = action.payload;
      state.edgeAnimation = edgeAnimation;
    },
    updateAluOperation(state, action) {
      const { aluOperation } = action.payload;
      state.aluOperation = aluOperation;
    },
    updateEdges(state, action) {
      const { edgeId, data } = action.payload;
      state.edges = current(state).edges.map((edge) => {
        let newEdge = { ...edge };
        if (edge.id === edgeId) {
          newEdge.data = data;
        }
        return newEdge;
      });
    },
    updateNodes(state, action) {
      const { nodeId, data } = action.payload;
      state.nodes = current(state).nodes.map((node) => {
        let newNode = { ...node };
        if (node.id === nodeId) {
          newNode.data = { data };
        }
        return newNode;
      });
    },
    updateInstructionRegister(state, action) {
      const { instructionRegister } = action.payload;
      state.instructionRegister = instructionRegister;
    },
    updateProgramCounter(state, action) {
      const { programCounter } = action.payload;
      state.programCounter = programCounter;
    },
    goToPreviousState(state) {
      state.registers = current(state).previousState.registers;
      state.nodes = current(state).previousState.nodes;
      state.edges = current(state).previousState.edges;
      state.programCounter = current(state).previousState.programCounter;
      state.edgeAnimation = current(state).previousState.edgeAnimation;
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
  updateEdgeAnimation,
  updateMainMemoryCells,
  updateAluOperation,
  updateNodes,
  updateEdges,
  updateInstructionRegister,
  updateProgramCounter,
  goToPreviousState,
  updatePreviousState,
  updateError,
} = applicationSlice.actions;

// Thunk para manejar la actualización del estado actual
export const updateCurrentState = (newState) => (dispatch) => {
  console.log("actualizo todos los estados");
  const {
    registers,
    mainMemoryCells,
    aluOperation,
    instructionRegister,
    programCounter,
    edgeAnimation,
  } = newState;
  dispatch(updateRegisters({ registers }));
  dispatch(updateMainMemoryCells({ mainMemoryCells }));
  dispatch(updateAluOperation({ aluOperation }));
  dispatch(updateNodes({ nodeId: registersId, data: registers }));
  dispatch(updateNodes({ nodeId: mainMemoryId, data: mainMemoryCells }));
  dispatch(updateNodes({ nodeId: aluId, data: aluOperation }));
  dispatch(updateEdgeAnimation({ edgeAnimation }));
  dispatch(
    updateEdges({
      edgeId: registerAluTopId,
      data: { position: "top", animated: edgeAnimation.registerAluTop },
    })
  );
  dispatch(
    updateEdges({
      edgeId: registerAluBottomId,
      data: { position: "bottom", animated: edgeAnimation.registerAluBottom },
    })
  );
  dispatch(
    updateEdges({
      edgeId: aluRegistersId,
      data: { position: "bottom", animated: edgeAnimation.aluRegisters },
    })
  );
  dispatch(updateProgramCounter({ programCounter: programCounter }));
  dispatch(
    updateInstructionRegister({
      instructionRegister: instructionRegister,
    })
  );
};

export default applicationSlice.reducer;
