import { typeSimulations } from "../../interpreter/constants";
import Instruction from "../Instruction";
import { applyBinaryOperation } from "../utils";

/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class ORInstruction extends Instruction{
  constructor(registerS, registerT, destinationIndex) {
    super();
    this.registerS = registerS;
    this.registerT = registerT;
    this.destinationIndex = destinationIndex;
  }

  execute(oldState) {
    const newState = { ...oldState };
    newState.programCounter += 1;
    return applyBinaryOperation(this, (a, b) => a | b, newState);
  }
}
