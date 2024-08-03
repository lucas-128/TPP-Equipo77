import { COPY_REGISTER_TO_REGISTER, typeSimulations } from "../../constants";
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
    const newState = { ...oldState };
    const { registers } = newState;
    const value = registers[this.sourceRegister];
    newState.registers[this.destinationRegister] = value;
    newState.programCounter += 1;
    newState.edgeAnimation = []; //Actualizar las aristas correspondientes
    return newState;
  }
}
