import { typeSimulations } from "../../constants";
import Instruction from "../Instruction";

/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class RotateRight extends Instruction{
  constructor(register, rotations) {
    super();
    this.rotations = rotations;
    this.register = register;
  }

  // nextStep(oldState, typeSimulation) {
  //   if (typeSimulation === typeSimulations.SIMPLE) {
  //     return this.execute(oldState);
  //   }
  // }

  execute(oldState) {
    const newState = { ...oldState };
    const registerValue = newState.registers[this.register];
    const length = registerValue.length;
    const registerT = newState.registers[this.rotations];
    const shift = registerT;
    const rotations = shift % length;
    const extendedPattern = registerValue + registerValue;
    newState.registers[this.register] = extendedPattern.substring(
      length - rotations,
      2 * length - rotations
    );
    return newState;
  }
}
