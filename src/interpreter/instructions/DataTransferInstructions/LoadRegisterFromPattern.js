/* 

Instruction: 2
Load the register R with the pattern XY

*/

import { typeSimulations } from "../../constants";

export default class LoadRegisterFromPattern {
  constructor(register, pattern) {
    this.register = register;
    this.pattern = pattern;
  }

  nextStep(oldState, typeSimulation) {
    if (typeSimulation === typeSimulations.SIMPLE) {
      return this.execute(oldState);
    }
  }

  execute(oldState) {
    const newState = { ...oldState };
    newState.registers = [...oldState.registers];
    newState.registers[this.register] = this.pattern;
    newState.programCounter += 1;
    return newState;
  }
}
