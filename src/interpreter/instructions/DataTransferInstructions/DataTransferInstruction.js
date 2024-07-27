/* 


*/

import { typeSimulations } from "../../constants";

// TODO: este si hay que hacer uno por cada uno, porque el 4 es distinto
export class DataTransferInstruction {
  constructor(instruction) {
    this.type = instruction[0];
    this.cycle = "";
  }

  nextStep(oldState, typeSimulation) {
    if (typeSimulation === typeSimulations.SIMPLE) {
      return this.resolve(oldState);
    }
  }
}
