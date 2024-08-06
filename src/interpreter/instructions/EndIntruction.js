import Instruction from "../Instruction";

/*

Instruction: b
Jumps to the instruction at address XY if the content of register R is equal to the content of register 0

*/

export default class End extends Instruction {
  constructor(instruction) {
    super();
    this.type = instruction[0];
    this.cycle = "";
  }

  execute(oldState) {
    const newState = { ...oldState };
    // TODO: cambiarlo para la instrucción branch
    newState.programCounter += 1;
    return newState;
  }
}
