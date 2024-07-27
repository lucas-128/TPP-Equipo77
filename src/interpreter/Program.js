import { AlInstructions, ControlInstructions, DataTransferInstructions } from "./constants";
import ALInstruction from "./instructions/ALInstructions/ALInstruction";
import { ControlInstruction } from "./instructions/ControlInstruction";
import { DataTransferInstruction } from "./instructions/DataTransferInstructions/DataTransferInstruction";
import { splitCode, validateSyntax } from "./main";

export default class Program {
  constructor(program) {
    this.program = program;
    this.typeSimulation = "simple";
    if (!validateSyntax(program)) {
        return;
    }
    this.instructions = this.createInstructions();
  }

  createInstructions() {
    const instructions = splitCode(this.program).filter((row) => row.length > 0);

    return instructions.map((instruction) => {
      return this.getInstruction(instruction);
    });
  }

  getInstruction(instruction) {
    const instructionType = instruction[0].toLowerCase();
    if(AlInstructions.includes(instructionType)) {
      return new ALInstruction(instruction);
    }
    else if(DataTransferInstructions.includes(instructionType)) {
      return new DataTransferInstruction(instruction);
    }
    else if(ControlInstructions.includes(instructionType)) {
      return new ControlInstruction(instruction);
    }
    else {
      // TODO: tiro error
    }
  }
}
