/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

import { typeSimulations } from "../../constants";

export default class AdditionTwoComplement {
  constructor(registerSIndex, registerTIndex, destinationIndex) {
    this.registerSIndex = registerSIndex;
    this.registerTIndex = registerTIndex;
    this.destinationIndex = destinationIndex;
  }

  nextStep(oldState, typeSimulation) {
    if (typeSimulation === typeSimulations.SIMPLE) {
      return this.execute(oldState);
    }
  }

  execute(oldState) {
    const newState = { ...oldState };
    newState.registers = [...oldState.registers];
    const registerS = newState.registers[this.registerS];
    const registerT = newState.registers[this.registerT];
    const operationResult = (registerS + registerT) & 0xff;
    newState.registers[this.destinationIndex] = operationResult;
    newState.programCounter += 1;
    return newState;
  }
}
