import Instruction from "../Instruction";

/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class FloatingPointSum extends Instruction {
  constructor(registerS, registerT, destinationIndex, id) {
    super(id);
    this.registerS = registerS;
    this.registerT = registerT;
    this.destinationIndex = destinationIndex;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.instructionId = this.id;
    //TODO: Definicion punto flotante como el libro
    return {...oldState, execute: newExecuteState};
  }
}
