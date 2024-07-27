export class ControlInstruction {
  constructor(instruction) {
    this.type = instruction[0];
    this.cycle = "";
  }

  nextStep(oldState, typeSimulation) {
    if (typeSimulation === typeSimulations.SIMPLE) {
      return this.resolve(oldState);
    }
  }
}
