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
    const newState = { ...oldState };
    newState.registers = [...oldState.registers];
    const { cacheMemoryCells } = oldState;
    const { mainMemoryCells } = oldState;

    const cell = cacheMemoryCells.find((cell) => cell ? cell.address === this.memoryAddress : false);
    if(cell){
      newState.registers[this.register] = cell.content;
      newState.programCounter += 1;
      return newState;
    }
    else{
      newState.cacheMemoryCells = [...oldState.cacheMemoryCells];
      newState.cacheMemoryCells = updateCache(newState, this.memoryAddress);
    }
    
    const value = mainMemoryCells[this.memoryAddress];

    newState.registers[this.register] = value;
    newState.programCounter += 1;
    return newState;
  }
}
