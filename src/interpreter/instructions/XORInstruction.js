import Instruction from "../Instruction";
import { applyBinaryOperation } from "../utils";
import { animationsAlu } from "../constants";

/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class XORInstruction extends Instruction {
  constructor(type, registerSIndex, registerTIndex, destinationIndex, id) {
    super(type, id);
    this.registerSIndex = registerSIndex;
    this.registerTIndex = registerTIndex;
    this.destinationIndex = destinationIndex;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.instructionId = this.id + 1;
    newExecuteState.edgeAnimation = animationsAlu;
    return {
      ...oldState,
      execute: applyBinaryOperation(this, (a, b) => a ^ b, newExecuteState),
    };
  }
}
