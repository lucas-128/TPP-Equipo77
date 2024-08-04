import { typeSimulations } from "../../constants";
import Instruction from "../Instruction";

/* 

Instruction: 1
Load the content of the memory cell with address XY into register R

*/

export default class LoadRegisterFromMem extends Instruction {
  constructor(register, memoryAddress) {
    super();
    this.register = register;
    this.memoryAddress = memoryAddress;
  }

  execute(oldState) {
    const newState = { ...oldState };
    newState.registers = [...oldState.registers];
    newState.programCounter += 1;
    if (this.memoryAddress === 254) {
      newState.showOutputPort = true;
      return newState;
    }
    const { mainMemoryCells } = newState;
    const value = mainMemoryCells[this.memoryAddress];
    newState.registers[this.register] = value;
    return newState;
  }
}
