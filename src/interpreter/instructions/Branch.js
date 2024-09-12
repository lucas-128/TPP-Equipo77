import Instruction from "../Instruction";
import { toBinary } from "../utils";
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
      newFetchState.programCounter = parseInt(this.nextInstructionDir, 16);
      newFetchState.instructionId = parseInt(this.nextInstructionDir, 16) / 2; //TODO: Check this
    } else {
      newFetchState.instructionId = this.id + 1;
    }
    return { ...oldState, fetch: newFetchState, execute: newExecuteState };
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
