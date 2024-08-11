// aca tener una clase que tenga updateProgram counter, load y fetch. Después cada inst tiene su execute

import {
  animationsFetch,
  cyclesSimulations,
  typeSimulations,
} from "./constants";

export default class Instruction {
  constructor(id) {
    this.cycle = cyclesSimulations.FETCH;
    this.id = id;
  }

  cleanState(oldState) {
    const cleanState = {
      fetch: { ...oldState.fetch },
      decode: { ...oldState.decode },
      execute: { ...oldState.execute },
    };
    cleanState.fetch.instructionId = null;
    cleanState.fetch.edgeAnimation = [];
    cleanState.decode.instructionId = null;
    cleanState.execute.instructionId = null;
    cleanState.execute.edgeAnimation = [];
    cleanState.execute.aluOperation = null;
    return cleanState;
  }

  nextStep(oldState, typeSimulation) {
    if (typeSimulation === typeSimulations.SIMPLE) {
      const stateAfterFetch = this.fetch(oldState);
      const stateAfterDecode = this.decode(stateAfterFetch);
      const cleanState = this.cleanState(stateAfterDecode);
      return this.execute(cleanState);
    } else if (typeSimulation === typeSimulations.CYCLES) {
      const cleanState = this.cleanState(oldState);
      if (this.cycle === cyclesSimulations.FETCH) {
        this.cycle = cyclesSimulations.DECODE;
        return this.fetch(cleanState);
      } else if (this.cycle === cyclesSimulations.DECODE) {
        this.cycle = cyclesSimulations.EXECUTE;
        return this.decode(cleanState);
      } else if (this.cycle === cyclesSimulations.EXECUTE) {
        this.cycle = cyclesSimulations.FETCH;
        const stateAfterExecute = this.execute(cleanState);
        const newState = {
          execute: stateAfterExecute.execute,
          fetch: stateAfterExecute.fetch,
          decode: stateAfterExecute.decode,
        };
        return newState;
      }
    }
  }

  fetch(oldState) {
    const newFetchState = { ...oldState.fetch };
    const mainMemoryCells = oldState.execute.mainMemoryCells;
    newFetchState.address = oldState.fetch.programCounter;

    newFetchState.instructionRegister =
      mainMemoryCells[oldState.fetch.programCounter] +
      mainMemoryCells[oldState.fetch.programCounter + 1];
    newFetchState.programCounter += 2;

    newFetchState.edgeAnimation = animationsFetch;
    newFetchState.instructionId = this.id;

    return { ...oldState, fetch: newFetchState };
  }

  decode(oldState) {
    const newDecodeState = { ...oldState.decode };
    newDecodeState.instructionId = this.id;
    return { ...oldState, decode: newDecodeState };
  }
}
