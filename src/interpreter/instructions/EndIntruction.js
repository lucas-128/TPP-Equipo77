import Instruction from "../Instruction";

/*

Instruction: b
Jumps to the instruction at address XY if the content of register R is equal to the content of register 0

*/

export default class End extends Instruction {
  constructor(instruction, id) {
    super(id);
    this.type = instruction[0];
    this.cycle = "";
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    return {...oldState, execute: newExecuteState};
  }
}
