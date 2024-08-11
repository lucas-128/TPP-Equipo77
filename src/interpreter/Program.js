import { typeSimulations } from "./constants";
import { splitCode, validateSyntax } from "./main";
import { InstructionFactory } from "./InstructionFactory";

export default class Program {
  constructor(program) {
    this.program = program;
    this.typeSimulation = typeSimulations.CYCLES;
    if (!validateSyntax(program)) {
      return;
    }
    this.instructions = this.createInstructions();
  }

  createInstructions() {
    const instructions = splitCode(this.program).filter(
      (row) => row.length > 0
    );

    return instructions.map((instruction, id) => {
      return InstructionFactory.createInstruction(instruction, id);
    });
  }

  getCurrentInstruction(state) {
    if(state.fetch.instructionId !== null){
      return this.instructions[state.fetch.instructionId];
    }else if(state.decode.instructionId !== null){
      return this.instructions[state.decode.instructionId];
    }
    return this.instructions[state.fetch.programCounter];
  }

  getNewState(oldState) {
    const actualInstruction = this.getCurrentInstruction(oldState);
    const newState = actualInstruction.nextStep(oldState, this.typeSimulation);
    return newState;
  }
}
