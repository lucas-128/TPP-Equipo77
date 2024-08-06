import { typeSimulations } from "../../interpreter/constants";
import Instruction from "../Instruction";

/* 

Instruction: 4
Copy the content of register R1 to register R2

*/


export default class FloatingPointSum extends Instruction{
  constructor(registerS, registerT, destinationIndex) {
    super();
    this.registerS = registerS;
    this.registerT = registerT;
    this.destinationIndex = destinationIndex;
  }

  execute(oldState) {
    const newState = { ...oldState };
    //TODO: Definicion punto flotante como el libro
    return newState;
  }
}
