import { AND } from "../../constants";
import Instruction from "../Instruction";
import { applyBinaryOperation } from "../utils";
import {
  registerAluBottomId,
  registerAluTopId,
  aluRegistersId,
} from "../../../containers/SimulatorSection/components";
/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class ANDInstruction extends Instruction {
  constructor(registerSIndex, registerTIndex, destinationIndex) {
    super();
    this.registerSIndex = registerSIndex;
    this.registerTIndex = registerTIndex;
    this.destinationIndex = destinationIndex;
  }

  execute(oldState) {
    const newState = { ...oldState };
    newState.programCounter += 1;
    newState.edgeAnimation = [
      registerAluTopId,
      registerAluBottomId,
      aluRegistersId,
    ];
    return applyBinaryOperation(this, (a, b) => a & b, newState);
  }
}
