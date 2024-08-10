import { ROTATE_RIGHT, typeSimulations } from "../constants";
import Instruction from "../Instruction";
import {
  registerAluBottomId,
  registerAluTopId,
  aluRegistersId,
} from "../../containers/SimulatorSection/components";

/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class RotateRight extends Instruction {
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
    const newExecuteState = { ...oldState.state };
    const registerValue = newExecuteState.registers[this.register];
    newExecuteState.edgeAnimation = [
      registerAluBottomId,
      registerAluTopId,
      aluRegistersId,
    ];
    const length = registerValue.length;
    const registerT = newExecuteState.registers[this.rotations];
    const shift = registerT;
    const rotations = shift % length;
    const extendedPattern = registerValue + registerValue;
    newExecuteState.registers[this.register] = extendedPattern.substring(
      length - rotations,
      2 * length - rotations
    );
    return { ...oldState, execute: newExecuteState };
  }
}
