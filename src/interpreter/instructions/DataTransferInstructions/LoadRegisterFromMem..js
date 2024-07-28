/* 

Instruction: 1
Load the content of the memory cell with address XY into register R

*/

import { typeSimulations } from "../../constants";

export default class LoadRegisterFromMem{
  constructor(register, memoryAddress) {
    this.register = register;
    this.memoryAddress = memoryAddress;
    this.cycle = "fetch";
  }

  nextStep(oldState, typeSimulation) {
    if (typeSimulation === typeSimulations.SIMPLE) {
      return this.execute(oldState);
    }
  }

  execute(oldState) {
    const newState = { ...oldState };
    newState.registers = [...oldState.registers];
    const { mainMemoryCells } = newState;
    const value = mainMemoryCells[this.memoryAddress];
    newState.registers[this.register] = value;
    newState.programCounter += 1;
    return newState;
  }
}
