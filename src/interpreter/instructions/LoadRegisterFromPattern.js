import Instruction from "../Instruction";
import { registersControlUnitId } from "../../containers/SimulatorSection/components";
import { toHexa, toBinary } from "../utils";

/* 

Instruction: 2
Load the register R with the pattern XY

*/

export default class LoadRegisterFromPattern extends Instruction {
  constructor(type, register, pattern, id) {
    super(type, id);
    this.register = register;
    this.pattern = pattern;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.registers = [...oldState.execute.registers];
    newExecuteState.registers[this.register] = this.pattern;
    newExecuteState.instructionId = this.id + 1;
    newExecuteState.edgeAnimation = [
      { id: registersControlUnitId, reverse: true },
    ];
    return { ...oldState, execute: newExecuteState };
  }

  toString() {
    return [
      "Opcode: 2 (LOAD_PATTERN)",
      "Origen: Patrón " + this.pattern + " -> " + toBinary(this.pattern),
      "Destino: Registro " + toHexa(this.register),
    ];
  }
}
