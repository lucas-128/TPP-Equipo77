import { COPY_REGISTER_TO_REGISTER, typeSimulations } from "../constants";
import Instruction from "../Instruction";
import { registersControlUnitId } from "../../containers/SimulatorSection/components";

/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class CopyRegisterToRegister extends Instruction {
  constructor(sourceRegister, destinationRegister, id) {
    super(id);
    this.sourceRegister = sourceRegister;
    this.destinationRegister = destinationRegister;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.registers = [...oldState.execute.registers];
    // const { registers } = newExecuteState;
    const value = newExecuteState.registers[this.sourceRegister];
    newExecuteState.registers[this.destinationRegister] = value;
    newExecuteState.instructionId = this.id + 1;
    newExecuteState.edgeAnimation = [registersControlUnitId]; //Actualizar las aristas correspondientes
    return { ...oldState, execute: newExecuteState };
  }
}
