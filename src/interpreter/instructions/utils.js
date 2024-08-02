import { operationNames } from "../constants";

export function applyBinaryOperation(instruction, operation, actualState) {
    const newState = { ...actualState, registers: [...actualState.registers] };
    const registerS = parseInt(actualState.registers[instruction.registerSIndex], 2);
    const registerT = parseInt(actualState.registers[instruction.registerTIndex], 2);
    const operationResult = operation(registerS, registerT);
    newState.aluOperation = {
      operation: operationNames[instruction.type],
      registerS: actualState.registers[instruction.registerSIndex],
      registerT: actualState.registers[instruction.registerTIndex],
      registerSIndex: instruction.registerSIndex,
      registerTIndex: instruction.registerTIndex,
      destinationIndex: instruction.destinationIndex,
      result: operationResult,
    };
    newState.registers[instruction.destinationIndex] = operationResult;
    return newState;
  }
