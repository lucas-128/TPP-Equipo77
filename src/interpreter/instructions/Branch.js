import { typeSimulations } from "../constants";
import Instruction from "../Instruction";
import { animationsAluData, toBinary } from "../utils";
/*

Instruction: b
Jumps to the instruction at address XY if the content of register R is equal to the content of register 0
*/

export default class Branch extends Instruction {
  constructor(type, instruction, id) {
    super(type, id);
    this.registerCompareId = instruction[1];
    this.nextInstructionDir = instruction[2] + instruction[3];
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    const newFetchState = { ...oldState.fetch };
    const { registers } = newExecuteState;
    const register0 = toBinary(registers[0]);
    const registerToCompare = toBinary(registers[this.registerCompareId]);
    if (register0 == registerToCompare) {
      newExecuteState.aluOperation = {
        operation: "EQUAL",
        registerS: registers[0],
        registerT: registers[this.registerCompareId],
        registerSIndex: 0,
        registerTIndex: this.registerCompareId,
        destinationIndex: null,
        result: register0 == registerToCompare,
      };
      newExecuteState.edgeAnimation = animationsAluData(
        0,
        register0,
        this.registerCompareId,
        registerToCompare,
        null,
        register0 == registerToCompare
      );

      newExecuteState.jumpInstruction = this.id;
      newExecuteState.instructionId = this.id + 1;
    } else {
      newFetchState.instructionId = this.id + 1;
    }

    return { ...oldState, fetch: newFetchState, execute: newExecuteState };
  }

  makeJump(oldState, typeSimulation) {
    const newExecuteState = { ...oldState.execute };
    const newFetchState = { ...oldState.fetch };
    const newDecodeState = { ...oldState.decode };
    newExecuteState.instructionId = parseInt(this.nextInstructionDir, 16) / 2;
    newFetchState.programCounter = parseInt(this.nextInstructionDir, 16);
    newExecuteState.jumpInstruction = null;
    newExecuteState.aluOperation = null;
    if (typeSimulation === typeSimulations.PIPELINING) {
      newDecodeState.edgeAnimation = [];
      newExecuteState.edgeAnimation = [];
      newDecodeState.instructionId = -1;
      newExecuteState.instructionId = -1;
      newFetchState.instructionId =
        parseInt(this.nextInstructionDir, 16) / 2 - 1;
    }
    return {
      ...oldState,
      fetch: newFetchState,
      execute: newExecuteState,
      decode: newDecodeState,
    };
  }

  toString() {
    return [
      ["Opcode: ", "B (BRANCH)"],
      ["Operando 1: ", "Registro " + this.registerCompareId],
      ["Operando 2: ", "Registro 0"],
      ["Siguiente instrucción: ", "Dirección " + this.nextInstructionDir],
    ];
  }
}
