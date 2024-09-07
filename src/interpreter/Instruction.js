// aca tener una clase que tenga updateProgram counter, load y fetch. Después cada inst tiene su execute

import {
  animationsFetch,
  cyclesSimulations,
  typeSimulations,
} from "./constants";
import { updateCache } from "./utils";

export default class Instruction {
  constructor(type, id) {
    this.cycle = cyclesSimulations.FETCH;
    this.id = id;
    this.type = type;
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
    } else if (typeSimulation === typeSimulations.PIPELINING) {
      let newState = oldState;
      if (this.cycle === cyclesSimulations.FETCH) {
        this.cycle = cyclesSimulations.DECODE;
        newState = this.fetch(oldState);
      } else if (this.cycle === cyclesSimulations.DECODE) {
        this.cycle = cyclesSimulations.EXECUTE;
        newState = this.decode(oldState);
      } else if (this.cycle === cyclesSimulations.EXECUTE) {
        this.cycle = cyclesSimulations.FETCH;
        newState = this.execute(oldState);
      }
      return newState;
    }
  }

  fetch(oldState) {
    const newFetchState = { ...oldState.fetch };
    const newExecuteState = { ...oldState.execute };
    const mainMemoryCells = oldState.execute.mainMemoryCells;
    newFetchState.address = oldState.fetch.programCounter;

    const currentInstruction =
      mainMemoryCells[oldState.fetch.programCounter] +
      mainMemoryCells[oldState.fetch.programCounter + 1];

    newFetchState.instructionRegister = currentInstruction;
    newFetchState.programCounter += 2;

    newFetchState.edgeAnimation = animationsFetch;
    newFetchState.instructionId = this.id;

    newExecuteState.cacheMemoryCells = updateCache(
      newExecuteState,
      oldState.fetch.programCounter
    );
    newExecuteState.cacheMemoryCells = updateCache(
      newExecuteState,
      oldState.fetch.programCounter + 1
    );

    return { ...oldState, fetch: newFetchState, execute: newExecuteState };
  }

  decode(oldState) {
    const newDecodeState = { ...oldState.decode };
    newDecodeState.instructionId = this.id;
    return { ...oldState, decode: newDecodeState };
  }
}
