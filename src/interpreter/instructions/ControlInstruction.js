import { typeSimulations } from "../constants";

export class ControlInstruction {
  constructor(instruction) {
    this.type = instruction[0];
    this.cycle = "";
  }

  nextStep(oldState, typeSimulation) {
    if (typeSimulation === typeSimulations.SIMPLE) {
      return this.resolve(oldState);
    }
  }

  resolve(oldState) {
    const newState = { ...oldState };
    // TODO: cambiarlo para la instrucción branch
    newState.programCounter += 1;
    return newState;
  }
}
