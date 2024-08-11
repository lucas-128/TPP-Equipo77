import Instruction from "../Instruction";

/* 

Instruction: 2
Load the register R with the pattern XY

*/

export default class LoadRegisterFromPattern extends Instruction {
  constructor(register, pattern, id) {
    super(id);
    this.register = register;
    this.pattern = pattern;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.registers = [...oldState.execute.registers];
    newExecuteState.registers[this.register] = this.pattern;
    newExecuteState.instructionId = this.id + 1;
    newExecuteState.edgeAnimation = []; //Actualizar las aristas correspondientes
    return {...oldState, execute: newExecuteState};
  }
}
