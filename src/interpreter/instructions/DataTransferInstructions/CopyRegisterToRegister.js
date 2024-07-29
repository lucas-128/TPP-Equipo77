/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

import { typeSimulations } from "../../constants";
import DataTransferInstruction from "./DataTransferInstruction";

export default class CopyRegisterToRegister extends DataTransferInstruction {
  constructor(sourceRegister, destinationRegister) {
    super();
    this.sourceRegister = sourceRegister;
    this.destinationRegister = destinationRegister;
  }

  execute(oldState) {
    const newState = { ...oldState };
    const { registers } = newState;
    const value = registers[this.sourceRegister];
    newState.registers[this.destinationRegister] = value;
    newState.programCounter += 1;
    return newState;
  }
}
