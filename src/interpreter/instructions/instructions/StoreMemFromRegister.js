import Instruction from "../Instruction";

/* 

Instruction: 3
Store the content of register R in the memory cell with address XY

*/

export default class StoreMemFromRegister extends Instruction {
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
