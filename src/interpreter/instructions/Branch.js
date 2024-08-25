import Instruction from "../Instruction";

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
    const { registers } = newExecuteState;
    const register0 = parseInt(registers[0], 2);
    const registerToCompare = parseInt(registers[this.registerCompareId], 2);
    if (register0 == registerToCompare) {
      newExecuteState.instructionId = parseInt(this.nextInstructionDir, 16) / 2;
    } else {
      newExecuteState.instructionId = this.id + 1;
    }
    return { ...oldState, execute: newExecuteState };
  }

  toString() {
    return [
      "Opcode: b (BRANCH)",
      "Operando 1: Registro " + this.registerCompareId,
      "Operando 2: Registro 0",
      "Siguiente instrucción: Dirección " + this.nextInstructionDir,
    ];
  }
}
