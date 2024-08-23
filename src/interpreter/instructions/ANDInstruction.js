import Instruction from "../Instruction";
import { applyBinaryOperation } from "../utils";
import { animationsAlu } from "../constants";
/* 

Instruction: 8
AND operation

*/

export default class ANDInstruction extends Instruction {
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
      execute: applyBinaryOperation(this, (a, b) => a & b, newExecuteState),
    };
  }
}
