import { COPY_REGISTER_TO_REGISTER, typeSimulations } from "../constants";
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
    // newExecuteState.programCounter += 1;
    newExecuteState.edgeAnimation = []; //Actualizar las aristas correspondientes
    return {...oldState, execute: newExecuteState};
  }
}
