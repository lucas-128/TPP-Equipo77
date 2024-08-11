import Instruction from "../Instruction";
import { applyBinaryOperation } from "../utils";
import { animationsAlu } from "../constants";
/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class ANDInstruction extends Instruction {
  constructor(registerSIndex, registerTIndex, destinationIndex, id) {
    super(id);
    this.registerSIndex = registerSIndex;
    this.registerTIndex = registerTIndex;
    this.destinationIndex = destinationIndex;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.instructionId = this.id;
    newExecuteState.edgeAnimation = animationsAlu;
    return {
      ...oldState,
      execute: applyBinaryOperation(this, (a, b) => a & b, newExecuteState),
    };
  }
}
