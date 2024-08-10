import { typeSimulations } from "../../interpreter/constants";
import Instruction from "../Instruction";
import { updateCache } from "../utils";

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
    const newExecuteState = { ...oldState.execute };
    newExecuteState.registers = [...oldState.execute.registers];
    const { cacheMemoryCells } = oldState.execute;
    const { mainMemoryCells } = oldState.execute;

    const cell = cacheMemoryCells.find((cell) => cell ? cell.address === this.memoryAddress : false);
    if(cell){
      newExecuteState.registers[this.register] = cell.content;
      // newExecuteState.programCounter += 1;
      return newExecuteState;
    }
    else{
      newExecuteState.cacheMemoryCells = [...oldState.execute.cacheMemoryCells];
      newExecuteState.cacheMemoryCells = updateCache(newExecuteState, this.memoryAddress);
    }
    
    const value = mainMemoryCells[this.memoryAddress];

    newExecuteState.registers[this.register] = value;
    // newExecuteState.programCounter += 1;
    return {...oldState, execute: newExecuteState};
  }
}
