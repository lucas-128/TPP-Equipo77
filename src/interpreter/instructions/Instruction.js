// aca tener una clase que tenga updateProgram counter, load y fetch. Después cada inst tiene su execute

export default class Instruction {
  constructor() {}

  updateProgramCounter(oldState) {
    const newState = { ...oldState };
    newState.programCounter += 1;
    return newState;
  }

  //TODO: hacer el fetch y el load
  // fetch(oldState) {
  // }

  // load(oldState) {
  // }
}
