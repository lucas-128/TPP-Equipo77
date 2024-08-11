import Instruction from "../Instruction";

/*

Instruction: b
Jumps to the instruction at address XY if the content of register R is equal to the content of register 0

*/

export default class Branch extends Instruction {
  constructor(instruction, id) {
    super(id);
    this.nextInstruction = instruction[2];
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    // TODO: cambiarlo para la instrucción branch
    const { mainMemoryCells } = newExecuteState;
    console.log(mainMemoryCells);
    newExecuteState.instructionId = this.id;
    return { ...oldState, execute: newExecuteState };
  }
}
