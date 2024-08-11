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

  getCurrentInstructionId(state) {
    // console.log("id del fetch", state.fetch.instructionId);
    // console.log("id del decode", state.decode.instructionId);
    // console.log("id del execute", state.execute.instructionId);
    if (state.fetch.instructionId !== null) {
      console.log("FETCH", state.fetch.instructionId);
      return state.fetch.instructionId;
    } else if (state.decode.instructionId !== null) {
      console.log("DECODE", state.decode.instructionId);
      return state.decode.instructionId;
    }
    console.log("EXECUTE ", state.execute.instructionId);
    return state.execute.instructionId;
  }

  getNewState(oldState) {
    const actualInstruction =
      this.instructions[this.getCurrentInstructionId(oldState)];
    console.log("actual Instruction", actualInstruction);
    const newState = actualInstruction.nextStep(oldState, this.typeSimulation);
    return newState;
  }
}
