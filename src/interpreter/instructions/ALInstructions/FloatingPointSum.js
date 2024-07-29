/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

import { typeSimulations } from "../../constants";

export default class FloatingPointSum {
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
    const newState = { ...oldState };
    //TODO: Definicion punto flotante como el libro
    return newState;
  }
}
