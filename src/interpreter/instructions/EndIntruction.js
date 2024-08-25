import Instruction from "../Instruction";

/*

Instruction: b
Jumps to the instruction at address XY if the content of register R is equal to the content of register 0

*/

export default class End extends Instruction {
  constructor(type, instruction, id) {
    super(type, id);
    this.type = instruction[0];
    this.cycle = "";
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.endProgram = true;
    return { ...oldState, execute: newExecuteState };
  }

  toString() {
    return ["Opcode: c (END)"];
  }
}
