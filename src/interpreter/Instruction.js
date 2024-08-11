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

  nextStep(oldState, typeSimulation) {
    console.log(this.cycle);
    if (typeSimulation === typeSimulations.SIMPLE) {
      const stateAfterFetch = this.fetch(oldState);
      const stateAfterDecode = this.decode(stateAfterFetch);
      const stateAfterExecute = this.execute(stateAfterDecode);
      return this.execute(stateAfterDecode);
    } else if (typeSimulation === typeSimulations.CYCLES) {
      const cleanState = {
        fetch: { ...oldState.fetch },
        decode: { ...oldState.decode },
        execute: { ...oldState.execute },
      };
      cleanState.fetch.instructionId = null;
      cleanState.decode.instructionId = null;
      cleanState.execute.instructionId = null;
      if (this.cycle === cyclesSimulations.FETCH) {
        this.cycle = cyclesSimulations.DECODE;
        return this.fetch(cleanState);
      } else if (this.cycle === cyclesSimulations.DECODE) {
        console.log("decode");
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
        newState.execute.instructionId = this.id;
        return newState;
      }
    }
  }

  //TODO: hacer el fetch
  //si va  de a una la dirección de memoria y la instruccion son dos direcciones de memoria esto se repite?,
  fetch(oldState) {
    const newFetchState = { ...oldState.fetch };
    const mainMemoryCells = oldState.execute.mainMemoryCells;
    newFetchState.address = oldState.fetch.programCounter;
    newFetchState.instructionRegister =
      mainMemoryCells[oldState.fetch.programCounter];
    newFetchState.edgeAnimations = animationsFetch;
    newFetchState.instructionId = this.id;
    newFetchState.programCounter += 1;
    return { ...oldState, fetch: newFetchState };
  }

  // TODO: hacer el decode
  decode(oldState) {
    const newDecodeState = { ...oldState.decode };
    newDecodeState.instructionId = this.id;
    console.log("decode mandando", newDecodeState);
    return { ...oldState, decode: newDecodeState };
  }
}
