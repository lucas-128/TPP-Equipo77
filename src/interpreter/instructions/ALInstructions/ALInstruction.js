import {
  ADDITION_TWO_COMPLEMENT,
  AND,
  FLOATING_POINT_SUM,
  OR,
  ROTATE_RIGHT,
  typeSimulations,
  XOR,
} from "../../constants";

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

export default class ALInstruction {
  constructor(instruction) {
    this.type = instruction[0];
    this.registerSIndex = parseInt(instruction[2], 16);
    this.registerTIndex = parseInt(instruction[3], 16);
    this.destinationIndex = parseInt(instruction[1], 16);
    this.cycle = "";
  }

  getDescription() {
    // TODO: acá podemos usar el logger (instruction_descriptor.js)
    return "";
  }

  nextStep(oldState, typeSimulation) {
    if (typeSimulation === typeSimulations.SIMPLE) {
      return this.resolve(oldState);
    }
  }

  applyBinaryOperation(operation, actualState) {
    const newState = { ...actualState, registers: [...actualState.registers] };
    const registerS = parseInt(actualState.registers[this.registerSIndex], 2);
    const registerT = parseInt(actualState.registers[this.registerTIndex], 2);
    const operationResult = operation(registerS, registerT)
      .toString(2)
      .padStart(8, "0");
    newState.aluOperation = {
      operation: operationNames[this.type],
      registerS: actualState.registers[registerSIndex],
      registerT: actualState.registers[registerTIndex],
      registerSIndex: registerSIndex,
      registerTIndex: registerTIndex,
      destinationIndex: destinationIndex,
      result: operationResult,
    };
    newState.registers[destinationIndex] = operationResult;
    return newState;
  }

  // TODO: Implementar una clase para cada instrucción.
  resolve(oldState) {
    let newState = { ...actualState };

    switch (this.type) {
      case ADDITION_TWO_COMPLEMENT: {
        const registerS = parseInt(oldState.registers[this.registerSIndex], 2);
        const registerT = parseInt(oldState.registers[this.registerTIndex], 2);
        const operationResult = (registerS + registerT) & 0xff;
        newState.registers[this.destinationIndex] = operationResult
          .toString(2)
          .padStart(8, "0");
        return newState;
      }
      case FLOATING_POINT_SUM: {
        // TODO: hacer punto flotante con definición del libro.
        return newState;
      }
      case OR:
        return this.applyBinaryOperation((a, b) => a | b, oldState);
      case AND:
        return this.applyBinaryOperation((a, b) => a & b, oldState);
      case XOR:
        return this.applyBinaryOperation((a, b) => a ^ b, oldState);
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
  }

}
