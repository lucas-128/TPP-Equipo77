import { LOAD_REGISTER_FROM_MEM, typeSimulations } from "../../constants";
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
    const { mainMemoryCells } = newState;
    const value = mainMemoryCells[this.memoryAddress];
    newState.registers[this.register] = value;
    newState.programCounter += 1;
    newState.edgeAnimation = []; //Actualizar las aristas correspondientes
    return newState;
  }
}
