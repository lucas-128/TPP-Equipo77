import { createSlice, current } from "@reduxjs/toolkit";
import {
  // aluId,
  // controlUnitId,
  initialEdges,
  initialNodes,
  // mainMemoryId,
  // registersId,
  // registerAluTopId,
  // registerAluBottomId,
  // aluRegistersId,
} from "../containers/SimulatorSection/components";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";
import { CACHE_SIZE } from "../interpreter/constants";

// LOS VALORES SE GUARDAN EN HEXADECIMAL
export const initialState = {
  execute: {
    registers: new Array(16).fill(null),
    mainMemoryCells: new Array(256).fill("-"),
    cacheMemoryCells: new Array(CACHE_SIZE).fill(null),
    programCounter: null,
    instructionRegister: "-",
    nodes: initialNodes,
    edges: initialEdges,
    previousState: null,
    aluOperation: null,
    edgeAnimation: [],
  },
  
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
      state.execute.nodes = applyNodeChanges(action.payload, state.execute.nodes);
    },
    onEdgesChange(state, action) {
      state.execute.edges = applyEdgeChanges(action.payload, state.execute.edges);
    },
    onConnect(state, action) {
      state.execute.edges = addEdge(action.payload, state.execute.edges);
    },
    updateExecuteState(state, action) {
      state.execute = action.payload;
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
    // ACTUALIZANDO EL EXECUTE ENTERO ESTO YA NO ES NECESARIO HACERLO POR SEPARADO
    // updateRegisters(state, action) {
    //   const { registers } = action.payload;
    //   state.execute.registers = registers;
    // },
    // updateMainMemoryCells(state, action) {
    //   const { mainMemoryCells } = action.payload;
    //   state.execute.mainMemoryCells = mainMemoryCells;
    // },
    updateEdgeAnimation(state, action) {
      const { edgeAnimation } = action.payload;
      state.execute.edgeAnimation = edgeAnimation;
    },
    // updateAluOperation(state, action) {
    //   const { aluOperation } = action.payload;
    //   state.execute.aluOperation = aluOperation;
    // },
    // updateCacheMemoryCells(state, action) {
    //   const { cacheMemoryCells } = action.payload;
    //   state.execute.cacheMemoryCells = cacheMemoryCells;
    // },
    updateEdges(state, action) {
      const { edgeId, data } = action.payload;
      state.execute.edges = current(state).edges.map((edge) => {
        let newEdge = { ...edge };
        if (edge.id === edgeId) {
          newEdge.data = data;
        }
        return newEdge;
      });
    },
    // updateNodes(state, action) {
    //   const { nodeId, data } = action.payload;
    //   state.execute.nodes = current(state).nodes.map((node) => {
    //     let newNode = { ...node };
    //     if (node.id === nodeId) {
    //       newNode.data = { data };
    //     }
    //     return newNode;
    //   });
    // },
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
      state.execute.programCounter = current(state).previousstate.execute.programCounter;
      state.execute.edgeAnimation = current(state).previousstate.execute.edgeAnimation;
      state.execute.instructionRegister =
        current(state).previousstate.execute.instructionRegister;
      state.execute.previousState = current(state).previousstate.execute.previousState;
    },
    updatePreviousState(state) {
      state.previousState = current(state);
    },
    clearApplication(state) {
      state.execute = initialState.execute;
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
  getProgramInMemory,
  // updateRegisters,
  updateEdgeAnimation,
  // updateMainMemoryCells,
  // updateAluOperation,
  // updateCacheMemoryCells,
  updateNodes,
  updateEdges,
  // updateInstructionRegister,
  // updateProgramCounter,
  goToPreviousState,
  updatePreviousState,
  updateError,
  clearApplication,
} = applicationSlice.actions;

// Thunk para manejar la actualización del estado actual
export const updateCurrentState = (newState) => (dispatch) => {
  console.log("actualizo todos los estados");
  // const {
  //   registers,
  //   mainMemoryCells,
  //   aluOperation,
  //   instructionRegister,
  //   programCounter,
  //   edgeAnimation,
  //   cacheMemoryCells,
  // } = newState;
  // dispatch(updateRegisters({ registers }));
  // dispatch(updateMainMemoryCells({ mainMemoryCells }));
  // dispatch(updateAluOperation({ aluOperation }));
  // dispatch(updateNodes({ nodeId: registersId, data: registers }));
  // dispatch(updateNodes({ nodeId: mainMemoryId, data: mainMemoryCells }));
  // dispatch(updateNodes({ nodeId: aluId, data: aluOperation }));
  // dispatch(updateEdgeAnimation({ edgeAnimation }));
  /*dispatch(
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
  );*/
  // dispatch(updateProgramCounter({ programCounter }));
  // dispatch(updateInstructionRegister({ instructionRegister }));
  // dispatch(updateCacheMemoryCells({ cacheMemoryCells }));

  dispatch(updateExecuteState(newState.execute));
};

export default applicationSlice.reducer;
