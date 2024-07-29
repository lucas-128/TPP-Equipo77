export default class DataTransferInstruction {
  constructor() {}

  nextStep(oldState, typeSimulation) {
    if (typeSimulation === "simple") {
      return this.execute(oldState);
    }
  }
}
