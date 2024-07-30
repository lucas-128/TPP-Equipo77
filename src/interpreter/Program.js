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

  // getInstruction(instruction) {
  //   const instructionType = instruction[0].toLowerCase();
  //   if (AlInstructions.includes(instructionType)) {
  //     return ALInstructionFactory.createALInstruction(instruction);
  //   } else if (DataTransferInstructions.includes(instructionType)) {
  //     return DataTransferInstructionFactory.createDataTransferInstruction(
  //       instruction
  //     );
  //   } else if (ControlInstructions.includes(instructionType)) {
  //     return new ControlInstruction(instruction);
  //   } else {
  //     // TODO: tiro error
  //   }
  // }

  getNewState(oldState) {
    const actualLine = oldState.programCounter;
    const actualInstruction = this.instructions[actualLine];
    console.log("la actual instruction es ", actualInstruction);
    const newState = actualInstruction.nextStep(oldState, this.typeSimulation);
    return newState;
  }
}
