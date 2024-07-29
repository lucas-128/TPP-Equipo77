/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

import { typeSimulations } from "../../constants";

export default class RotateRight {
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
    const registerValue = newState.registers[this.destinationIndex];
    const length = registerValue.length;
    const registerT = newState.registers[this.registerTIndex];
    const shift = registerT;
    const rotations = shift % length;
    const extendedPattern = registerValue + registerValue;
    newState.registers[this.destinationIndex] = extendedPattern.substring(
      length - rotations,
      2 * length - rotations
    );
    return newState;
  }
}
