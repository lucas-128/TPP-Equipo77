/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

import { typeSimulations } from "../../constants";

export default class CopyRegisterToRegister {
  constructor(sourceRegister, destinationRegister) {
    this.sourceRegister = sourceRegister;
    this.destinationRegister = destinationRegister;
  }

  nextStep(oldState, typeSimulation) {
    if (typeSimulation === typeSimulations.SIMPLE) {
      return this.execute(oldState);
    }
  }

  execute(oldState) {
    const newState = { ...oldState };
    const { registers } = newState;
    const value = registers[this.sourceRegister];
    newState.registers[this.destinationRegister] = value;
    newState.programCounter += 1;
    return newState;
  }
}
