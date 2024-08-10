import Instruction from "../Instruction";
import {
  registerAluBottomId,
  registerAluTopId,
  aluRegistersId,
} from "../../containers/SimulatorSection/components";
/* 

Instruction: 4
Copy the content of register R1 to register R2

*/

export default class AdditionTwoComplement extends Instruction {
  constructor(registerSIndex, registerTIndex, destinationIndex) {
    super();
    this.registerSIndex = registerSIndex;
    this.registerTIndex = registerTIndex;
    this.destinationIndex = destinationIndex;
  }

  // nextStep(oldState, typeSimulation) {
  //   if (typeSimulation === typeSimulations.SIMPLE) {
  //     return this.execute(oldState);
  //   }
  // }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.registers = [...oldState.execute.registers];
    const registerS = newExecuteState.registers[this.registerS];
    const registerT = newExecuteState.registers[this.registerT];
    const operationResult = (registerS + registerT) & 0xff;
    newExecuteState.registers[this.destinationIndex] = operationResult;
    // newExecuteState.programCounter += 1;
    newExecuteState.edgeAnimation = [
      registerAluTopId,
      registerAluBottomId,
      aluRegistersId,
    ];
    
    return {...oldState, execute: newExecuteState};
  }
}
