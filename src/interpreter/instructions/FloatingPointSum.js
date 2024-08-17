import Instruction from "../Instruction";

/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class FloatingPointSum extends Instruction {
  constructor(type, registerS, registerT, destinationIndex, id) {
    super(type, id);
    this.registerS = registerS;
    this.registerT = registerT;
    this.destinationIndex = destinationIndex;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.instructionId = this.id + 1;
    //TODO: Definicion punto flotante como el libro
    return { ...oldState, execute: newExecuteState };
  }
}
