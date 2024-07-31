import { typeSimulations } from "./constants";
import { splitCode, validateSyntax } from "./main";
import { InstructionFactory } from "./instructions/InstructionFactory";

export default class Program {
  constructor(program) {
    this.program = program;
    this.typeSimulation = typeSimulations.SIMPLE;
    if (!validateSyntax(program)) {
      return;
    }
    this.instructions = this.createInstructions();
  }

  createInstructions() {
    const instructions = splitCode(this.program).filter(
      (row) => row.length > 0
    );

    return instructions.map((instruction) => {
      return InstructionFactory.createInstruction(instruction);
    });
  }

  getNewState(oldState) {
    const actualLine = oldState.programCounter;
    const actualInstruction = this.instructions[actualLine];
    const newState = actualInstruction.nextStep(oldState, this.typeSimulation);
    return newState;
  }
}
