import Instruction from "../Instruction";
import { animationsAlu } from "../constants";
/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class AdditionTwoComplement extends Instruction {
  constructor(type, registerSIndex, registerTIndex, destinationIndex, id) {
    super(type, id);
    this.registerSIndex = registerSIndex;
    this.registerTIndex = registerTIndex;
    this.destinationIndex = destinationIndex;
  }

  // nextStep(oldState, typeSimulation) {
  //   if (typeSimulation === typeSimulations.SIMPLE) {
  //     return this.execute(oldState);
  //   }
  // }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.registers = [...oldState.execute.registers];
    const registerS = newExecuteState.registers[this.registerS];
    const registerT = newExecuteState.registers[this.registerT];
    const operationResult = (registerS + registerT) & 0xff;
    newExecuteState.registers[this.destinationIndex] = operationResult;
    newExecuteState.instructionId = this.id + 1;
    newExecuteState.edgeAnimation = animationsAlu;

    return { ...oldState, execute: newExecuteState };
  }
}
