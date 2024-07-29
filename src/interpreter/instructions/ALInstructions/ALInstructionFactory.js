import {
  registerAluBottomId,
  registerAluTopId,
  registersId,
} from "../../../containers/SimulatorSection/components";
import {
  ADDITION_TWO_COMPLEMENT,
  AND,
  FLOATING_POINT_SUM,
  operationNames,
  OR,
  ROTATE_RIGHT,
  typeSimulations,
  XOR,
} from "../../constants";
import AdditionTwoComplement from "./AdditionTwoComplement";
import FloatingPointSum from "./FloatingPointSum";
import ORInstruction from "./ORInstruction";
import RotateRight from "./RotateRight";
import XORInstruction from "./XORInstruction";
import ANDInstruction from "./ANDInstruction";

/*
  Class for Arithmetic and Logic instructions
  Structure of the instruction: [inst]RST

  R: Destination register
  S: Source register
  T: Source register

  Exeptions: [a], only uses R and X

  Types: 
    - [5]: Suma en complemento a 2
    - [6]: Suma en punto flotante
    - [7]: OR
    - [8]: AND
    - [9]: XOR
    - [a]: Rotar a la izquierda el contenido del registro R, X veces
*/

export class ALInstructionFactory {
  static createALInstruction(instruction) {
    const type = instruction[0];
    const registerSIndex = parseInt(instruction[2], 16);
    const registerTIndex = parseInt(instruction[3], 16);
    const destinationIndex = parseInt(instruction[1], 16);
    const cycle = "";
    switch (type) {
      case ADDITION_TWO_COMPLEMENT:
        return new AdditionTwoComplement(
          registerSIndex,
          registerTIndex,
          destinationIndex
        );
      case FLOATING_POINT_SUM:
        return new FloatingPointSum(
          registerSIndex,
          registerTIndex,
          destinationIndex
        );
      case ROTATE_RIGHT:
        return new RotateRight(
          registerSIndex,
          registerTIndex,
          destinationIndex
        );
      case OR:
        return new ORInstruction(
          registerSIndex,
          registerTIndex,
          destinationIndex
        );
      case AND:
        return new ANDInstruction(
          registerSIndex,
          registerTIndex,
          destinationIndex
        );
      case XOR:
        return new XORInstruction(
          registerSIndex,
          registerTIndex,
          destinationIndex
        );
    }
  }

  /*getDescription() {
    // TODO: acá podemos usar el logger (instruction_descriptor.js)
    return "";
  }

  nextStep(oldState, typeSimulation) {
    if (typeSimulation === typeSimulations.SIMPLE) {
      return this.execute(oldState);
    }
  }

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

  // TODO: Implementar una clase para cada instrucción.
  execute(oldState) {
    let newState = { ...oldState };
    newState.programCounter += 1;
    const newAnimation = [registerAluBottomId, registerAluTopId, registersId];
    newState.edgeAnimation = newAnimation;
    const newRegisters = [...newState.registers];
    switch (this.type) {
      case ADDITION_TWO_COMPLEMENT: {
        const registerS = parseInt(oldState.registers[this.registerSIndex], 2);
        const registerT = parseInt(oldState.registers[this.registerTIndex], 2);
        const operationResult = (registerS + registerT) & 0xff;
        newRegisters[this.destinationIndex] = operationResult;
        return newState;
      }
      case FLOATING_POINT_SUM: {
        // TODO: hacer punto flotante con definición del libro.
        return newState;
      }
      case OR:
        return this.applyBinaryOperation((a, b) => a | b, newState);
      case AND:
        return this.applyBinaryOperation((a, b) => a & b, newState);
      case XOR:
        return this.applyBinaryOperation((a, b) => a ^ b, newState);
      case ROTATE_RIGHT:
        // TODO: Rotar a derecha el contenido del registro R, X veces
        const registerValue = newState.registers[this.destinationIndex];
        const length = registerValue.length;
        const shift = this.registerTIndex;
        const rotations = shift % length;
        const extendedPattern = registerValue + registerValue;
        newState.registers[this.destinationIndex] = extendedPattern.substring(
          length - rotations,
          2 * length - rotations
        );
        return newState;
    }
  }*/
}
