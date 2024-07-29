/* 

Instruction: 2
Load the register R with the pattern XY

*/

import { typeSimulations } from "../../constants";
import DataTransferInstruction from "./DataTransferInstruction";

export default class LoadRegisterFromPattern extends DataTransferInstruction {
  constructor(register, pattern) {
    super();
    this.register = register;
    this.pattern = pattern;
  }

  execute(oldState) {
    const newState = { ...oldState };
    newState.registers = [...oldState.registers];
    newState.registers[this.register] = this.pattern;
    newState.programCounter += 1;
    return newState;
  }
}
