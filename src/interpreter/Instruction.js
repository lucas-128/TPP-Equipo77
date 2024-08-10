// aca tener una clase que tenga updateProgram counter, load y fetch. Después cada inst tiene su execute

import { cyclesSimulations, typeSimulations } from "./constants";

export default class Instruction {
  constructor() {
    this.cycle = cyclesSimulations.FETCH;
  }

  nextStep(oldState, typeSimulation) {
    if (typeSimulation === typeSimulations.SIMPLE) {
      const stateAfterFetch = this.fetch(oldState);
      const stateAfterDecode = this.decode(stateAfterFetch);
      return this.execute(stateAfterDecode);
    } else if (typeSimulation === typeSimulations.CYCLES) {
      if (this.cycle === cyclesSimulations.FETCH) {
        console.log("fetch");
        console.log(oldState);
        this.cycle = cyclesSimulations.DECODE;
        return this.fetch(oldState);
      } else if (this.cycle === cyclesSimulations.DECODE) {
        this.cycle = cyclesSimulations.EXECUTE;
        return this.decode(oldState);
      } else if (this.cycle === cyclesSimulations.EXECUTE) {
        this.cycle = cyclesSimulations.FETCH;
        return this.execute(oldState);
      }
    }
  }

  //TODO: hacer el fetch
  //si va  de a una la dirección de memoria y la instruccion son dos direcciones de memoria esto se repite?,
  fetch(oldState) {
    const newFetchState = { ...oldState.fetch };
    const mainMemoryCells = oldState.execute.mainMemoryCells;
    console.log(mainMemoryCells);
    console.log(oldState.fetch);
    newFetchState.address = oldState.fetch.programCounter;
    newFetchState.instructionRegister = mainMemoryCells[oldState.fetch.programCounter];

    console.log(newFetchState.address);
    return {...oldState, fetch: newFetchState};
  }

  // TODO: hacer el decode
  decode(oldState) {
    return oldState;
  }
}
