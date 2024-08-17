import { ROTATE_RIGHT, typeSimulations } from "../constants";
import Instruction from "../Instruction";
import { animationsAlu } from "../constants";

/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class RotateRight extends Instruction {
  constructor(type, register, rotations, id) {
    super(type, id);
    this.rotations = rotations;
    this.register = register;
  }

  // nextStep(oldState, typeSimulation) {
  //   if (typeSimulation === typeSimulations.SIMPLE) {
  //     return this.execute(oldState);
  //   }
  // }

  execute(oldState) {
    const newExecuteState = { ...oldState.state };
    const registerValue = newExecuteState.registers[this.register];
    const length = registerValue.length;
    const registerT = newExecuteState.registers[this.rotations];
    const shift = registerT;
    const rotations = shift % length;
    const extendedPattern = registerValue + registerValue;
    newExecuteState.registers[this.register] = extendedPattern.substring(
      length - rotations,
      2 * length - rotations
    );

    newExecuteState.instructionId = this.id + 1;
    newExecuteState.edgeAnimation = animationsAlu;

    return { ...oldState, execute: newExecuteState };
  }
}
