import Instruction from "../Instruction";
import { updateCache } from "../utils";

/* 

Instruction: 1
Load the content of the memory cell with address XY into register R

*/

export default class LoadRegisterFromMem extends Instruction {
  constructor(register, memoryAddress, id) {
    super(id);
    this.register = register;
    this.memoryAddress = memoryAddress;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.registers = [...oldState.execute.registers];
    const { mainMemoryCells } = oldState.execute;
    newExecuteState.cacheMemoryCells = updateCache(
      newExecuteState,
      this.memoryAddress
    );

    const value = mainMemoryCells[this.memoryAddress];

    newExecuteState.registers[this.register] = value;
    newExecuteState.instructionId = this.id + 1;

    return { ...oldState, execute: newExecuteState };
  }
}
