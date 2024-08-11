import Instruction from "../Instruction";
import { applyBinaryOperation } from "../utils";
import {
  registerAluBottomId,
  registerAluTopId,
  aluRegistersId,
} from "../../containers/SimulatorSection/components";
/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class ORInstruction extends Instruction {
  constructor(registerSIndex, registerTIndex, destinationIndex, id) {
    super(id);
    this.registerSIndex = registerSIndex;
    this.registerTIndex = registerTIndex;
    this.destinationIndex = destinationIndex;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.instructionId = this.id;
    newExecuteState.edgeAnimation = [
      registerAluBottomId,
      registerAluTopId,
      aluRegistersId,
    ];
    return {...oldState, execute: applyBinaryOperation(this, (a, b) => a | b, newExecuteState)};
  }
}
