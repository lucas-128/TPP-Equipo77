import { LOAD_REGISTER_FROM_PATTERN } from "../../constants";
import Instruction from "../Instruction";

/* 

Instruction: 2
Load the register R with the pattern XY

*/

export default class LoadRegisterFromPattern extends Instruction {
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
    newState.edgeAnimation = []; //Actualizar las aristas correspondientes
    return newState;
  }
}
