import { operationNames, typeSimulations } from "../../constants";
import Instruction from "../Instruction";

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

  // nextStep(oldState, typeSimulation) {
  //   if (typeSimulation === typeSimulations.SIMPLE) {
  //     return this.execute(oldState);
  //   }
  // }

  applyBinaryOperation(operation, actualState) {
    const newState = { ...actualState, registers: [...actualState.registers] };
    const registerS = parseInt(actualState.registers[this.registerSIndex], 2);
    const registerT = parseInt(actualState.registers[this.registerTIndex], 2);
    const operationResult = operation(registerS, registerT);
    newState.aluOperation = {
      operation: operationNames[this.type],
      registerS: actualState.registers[this.registerSIndex],
      registerT: actualState.registers[this.registerTIndex],
      registerSIndex: this.registerSIndex,
      registerTIndex: this.registerTIndex,
      destinationIndex: this.destinationIndex,
      result: operationResult,
    };
    newState.registers[this.destinationIndex] = operationResult;
    return newState;
  }

  execute(oldState) {
    //Agregar
    const newState = { ...oldState };
    newState.programCounter += 1;
    return this.applyBinaryOperation((a, b) => a & b, newState);
  }
}
