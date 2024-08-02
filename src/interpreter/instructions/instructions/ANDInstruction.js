import { operationNames, typeSimulations } from "../../constants";
import Instruction from "../Instruction";
import { applyBinaryOperation } from "../utils";

/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class ANDInstruction extends Instruction {
  constructor(registerSIndex, registerTIndex, destinationIndex) {
    super();
    this.registerSIndex = registerSIndex;
    this.registerTIndex = registerTIndex;
    this.destinationIndex = destinationIndex;
  }

  execute(oldState) {
    const newState = { ...oldState };
    newState.programCounter += 1;
    return applyBinaryOperation(this, (a, b) => a & b, newState);
  }
}
