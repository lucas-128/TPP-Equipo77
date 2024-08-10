import Instruction from "../Instruction";
import { updateCache } from "../utils";

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
    const newExecuteState = { ...oldState.execute };
    const { registers } = newExecuteState;
    newExecuteState.mainMemoryCells = [...oldState.execute.mainMemoryCells];
    const value = registers[this.register];

    newExecuteState.mainMemoryCells[this.memoryCell] = value;
    newExecuteState.cacheMemoryCells = updateCache(newExecuteState, this.memoryCell);  
    // newExecuteState.programCounter += 1;
    return {...oldState, execute: newExecuteState};
  }
}
