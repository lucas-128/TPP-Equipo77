import { typeSimulations } from "../../interpreter/constants";
import Instruction from "../Instruction";

/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class CopyRegisterToRegister extends Instruction {
  constructor(sourceRegister, destinationRegister) {
    super();
    this.sourceRegister = sourceRegister;
    this.destinationRegister = destinationRegister;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    const { registers } = newExecuteState;
    const value = registers[this.sourceRegister];
    newExecuteState.registers[this.destinationRegister] = value;
    newExecuteState.programCounter += 1;
    return {...oldState, execute: newExecuteState};
  }
}
