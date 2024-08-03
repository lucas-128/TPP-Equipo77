import { operationNames } from "../constants";
import {
  registerAluBottomId,
  registerAluTopId,
  aluRegistersId,
} from "../../containers/SimulatorSection/components";

export function applyBinaryOperation(instruction, operation, actualState) {
  const newState = { ...actualState, registers: [...actualState.registers] };
  const registerS = actualState.registers[instruction.registerSIndex];
  const registerT = actualState.registers[instruction.registerTIndex];
  const operationResult = operation(registerS, registerT);
  newState.aluOperation = {
    operation: operationNames[instruction.type],
    registerS,
    registerT,
    registerSIndex: instruction.registerSIndex,
    registerTIndex: instruction.registerTIndex,
    destinationIndex: instruction.destinationIndex,
    result: operationResult,
  };
  newState.registers[instruction.destinationIndex] = operationResult;
  return newState;
}
