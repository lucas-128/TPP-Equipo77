import Instruction from "../Instruction";
import { animationsAlu } from "../constants";
import { animationsAluData, toHexa } from "../utils";

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
    newExecuteState.edgeAnimation = animationsAluData(
      this.register,
      registerValue,
      null,
      null,
      this.register,
      newExecuteState.registers[this.register]
    );

    return { ...oldState, execute: newExecuteState };
  }

  toString() {
    return [
      ["Opcode: ", "A (ROTATE)"],
      [
        "Operando 1: ",
        "Registro " + toHexa(this.register),
        ...(parseInt(this.rotations) == 1
          ? ["Rotación: " + this.rotations + " vez"]
          : ["Rotación: " + this.rotations + " veces"]),
      ],
    ];
  }
}
