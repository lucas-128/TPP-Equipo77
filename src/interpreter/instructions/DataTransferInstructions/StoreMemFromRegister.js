/* 

Instruction: 3
Store the content of register R in the memory cell with address XY

*/

import { typeSimulations } from "../../constants";
import DataTransferInstruction from "./DataTransferInstruction";

export default class StoreMemFromRegister extends DataTransferInstruction {
  constructor(register, memoryCell) {
    super();
    this.register = register;
    this.memoryCell = memoryCell;
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
