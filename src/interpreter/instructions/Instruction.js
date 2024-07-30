// aca tener una clase que tenga updateProgram counter, load y fetch. Después cada inst tiene su execute

import { typeSimulations } from "../constants";

export default class Instruction {
  constructor() {}

  updateProgramCounter(oldState) {
    const newState = { ...oldState };
    newState.programCounter += 1;
    return newState;
  }

  nextStep(oldState, typeSimulation) {
    if (typeSimulation === typeSimulations.SIMPLE) {
      console.log('llega a ejecutarse');
      return this.execute(oldState);
    }
  }

  //TODO: hacer el fetch y el load
  // fetch(oldState) {
  // }

  // load(oldState) {
  // }
}
