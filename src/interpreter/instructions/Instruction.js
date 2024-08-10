// aca tener una clase que tenga updateProgram counter, load y fetch. Después cada inst tiene su execute

import {
  AlInstructions,
  cyclesSimulations,
  typeSimulations,
  ControlInstructions,
  DataTransferInstructions,
} from "../constants";
import {
  registerAluBottomId,
  registerAluTopId,
  aluRegistersId,
} from "../../containers/SimulatorSection/components";

export default class Instruction {
  constructor() {
    this.cycle = cyclesSimulations.FETCH;
  }

  updateProgramCounter(oldState) {
    const newState = { ...oldState };
    newState.programCounter += 1;
    return newState;
  }

  nextStep(oldState, typeSimulation) {
    if (typeSimulation === typeSimulations.SIMPLE) {
      return this.execute(oldState);
    } else if (typeSimulation === typeSimulations.CYCLES) {
      if (this.cycle === cyclesSimulations.FETCH) {
        this.cycle = cyclesSimulations.DECODE;
        return this.fetch(oldState);
      }
    }
  }

  //TODO: hacer el fetch
  fetch(oldState) {
    return;
  }

  // TODO: hacer el decode
  decode(oldState) {
    return;
  }
}
