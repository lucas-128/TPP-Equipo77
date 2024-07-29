/* 

Instruction: 1
Load the content of the memory cell with address XY into register R

*/

import { typeSimulations } from "../../constants";
import DataTransferInstruction from "./DataTransferInstruction";

export default class LoadRegisterFromMem extends DataTransferInstruction {
  constructor(register, memoryAddress) {
    super();
    this.register = register;
    this.memoryAddress = memoryAddress;
    this.cycle = "fetch";
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
