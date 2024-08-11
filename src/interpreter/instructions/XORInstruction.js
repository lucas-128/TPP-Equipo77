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

export default class XORInstruction extends Instruction {
  constructor(registerS, registerT, destinationIndex, id) {
    super(id);
    this.registerS = registerS;
    this.registerT = registerT;
    this.destinationIndex = destinationIndex;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.edgeAnimation = [
      registerAluBottomId,
      registerAluTopId,
      aluRegistersId,
    ];
    newExecuteState.instructionId = this.id;
    return {...oldState, execute: applyBinaryOperation(this, (a, b) => a ^ b, newExecuteState)};
  }
}
