import Instruction from "../Instruction";
import { applyBinaryOperation } from "../utils";
import { animationsAlu } from "../constants";

/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class XORInstruction extends Instruction {
  constructor(registerS, registerT, destinationIndex, id) {
    super(id);
    this.registerS = registerS;
    this.registerT = registerT;
    this.destinationIndex = destinationIndex;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.instructionId = this.id;
    newExecuteState.edgeAnimation = animationsAlu;
    return {
      ...oldState,
      execute: applyBinaryOperation(this, (a, b) => a ^ b, newExecuteState),
    };
  }
}
