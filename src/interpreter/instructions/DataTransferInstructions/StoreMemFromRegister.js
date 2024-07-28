/* 

Instruction: 3
Store the content of register R in the memory cell with address XY

*/

import { typeSimulations } from "../../constants";

export default class StoreMemFromRegister {
  constructor(register, memoryCell) {
    this.register = register;
    this.memoryCell = memoryCell;
  }

  nextStep(oldState, typeSimulation) {
    if (typeSimulation === typeSimulations.SIMPLE) {
      return this.execute(oldState);
    }
  }

  execute(oldState) {
    const newState = { ...oldState };
    const { registers } = newState;
    const value = registers[this.register];
    newState.mainMemoryCells[this.memoryCell] = value;
    newState.programCounter += 1;
    return newState;
  }
}
