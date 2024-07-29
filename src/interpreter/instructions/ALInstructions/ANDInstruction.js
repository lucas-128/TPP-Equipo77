/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

import { typeSimulations } from "../../constants";

export default class ANDInstruction {
  constructor(registerS, registerT, destinationIndex) {
    this.registerS = registerS;
    this.registerT = registerT;
    this.destinationIndex = destinationIndex;
  }

  nextStep(oldState, typeSimulation) {
    if (typeSimulation === typeSimulations.SIMPLE) {
      return this.execute(oldState);
    }
  }

  execute(oldState) {
    //Agregar
    const newState = { ...oldState };
    newState.programCounter += 1;
    return newState;
  }
}
