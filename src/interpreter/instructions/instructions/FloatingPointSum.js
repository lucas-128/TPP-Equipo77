import { typeSimulations } from "../../constants";
import Instruction from "../Instruction";

/* 

Instruction: 4
Copy the content of register R1 to register R2

*/


export default class FloatingPointSum extends Instruction{
  constructor(registerS, registerT, destinationIndex) {
    this.registerS = registerS;
    this.registerT = registerT;
    this.destinationIndex = destinationIndex;
  }

  // nextStep(oldState, typeSimulation) {
  //   if (typeSimulation === typeSimulations.SIMPLE) {
  //     return this.execute(oldState);
  //   }
  // }

  execute(oldState) {
    const newState = { ...oldState };
    //TODO: Definicion punto flotante como el libro
    return newState;
  }
}
