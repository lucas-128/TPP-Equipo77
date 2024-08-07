import { typeSimulations } from "../../constants";
import Instruction from "../Instruction";

/* 
Instruction: 6
Floating-point addition of the contents of registers S and T and store the result in register R.
*/

export default class FloatingPointSum extends Instruction {
  constructor(registerS, registerT, destinationIndex) {
    super();
    this.registerS = registerS;
    this.registerT = registerT;
    this.destinationIndex = destinationIndex;
  }

  execute(oldState) {
    const newState = { ...oldState };
    newState.registers = [...oldState.registers];
    const registerS = newState.registers[this.registerS];
    const registerT = newState.registers[this.registerT];

    console.log("Contenido de registro S", registerS);
    console.log("Contenido de registro T", registerT);

    // test
    let operationResult = 5.0;

    // store the operation
    newState.registers[this.destinationIndex] = operationResult;
    newState.programCounter += 1;
    return newState;
  }
}
