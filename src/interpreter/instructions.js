import { operationNames } from "./constants.js";

function applyBinaryOperation(operation, actualState, row) {
  const newState = { ...actualState, registers: [...actualState.registers] };
  const registerSIndex = parseInt(row[2], 16);
  const registerTIndex = parseInt(row[3], 16);
  const destinationIndex = parseInt(row[1], 16);
  const registerS = parseInt(actualState.registers[registerSIndex], 2);
  const registerT = parseInt(actualState.registers[registerTIndex], 2);
  const operationResult = operation(registerS, registerT)
    .toString(2)
    .padStart(8, "0");
  newState.aluOperation = {
    operation: operationNames[row[0]],
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

export function getStateAfterInstruction(
  actualState,
  instruction,
  row,
  selectedLine
) {
  let newState = { ...actualState };
  newState.registers = [...actualState.registers];
  newState.mainMemoryCells = [...actualState.mainMemoryCells];
  newState.aluOperation = null;
  newState.edgeAnimation = { ...actualState.edgeAnimation };
  newState.instructionRegister = row.slice(0, 4).join("");
  newState.programCounter = (selectedLine * 2).toString(16).padStart(2, "0");
  switch (instruction) {
    case "1": {
      // 1RXY
      // Cargar en el registro R el contenido de la celda con dirección XY
      const memoryIndex = parseInt(row[2] + row[3], 16);
      newState.registers[parseInt(row[1], 16)] =
        actualState.mainMemoryCells[memoryIndex];
      newState.edgeAnimation.registerAluTop = true;
      newState.edgeAnimation.registerAluBottom = true;
      newState.edgeAnimation.aluRegisters = true;
      return newState;
    }
    case "2":
      newState.registers[parseInt(row[1], 16)] = parseInt(row[2] + row[3], 16)
        .toString(2)
        .padStart(8, "0");
      newState.edgeAnimation.registerAluTop = false;
      newState.edgeAnimation.registerAluBottom = false;
      return newState;
    case "3": {
      const memoryIndex = parseInt(row[2] + row[3], 16);
      const registerIndex = parseInt(row[1], 16);
      newState.mainMemoryCells[memoryIndex] =
        actualState.registers[registerIndex];
      return newState;
    }
    case "4":
      newState.registers[parseInt(row[3], 16)] = actualState.registers[row[2]];
      return newState;
    case "5": {
      // 5RST
      // Sumar en complemento a 2 los contenidos de los registros S y T y dejar el resultado en R
      const registerSIndex = parseInt(row[2], 16);
      const registerTIndex = parseInt(row[3], 16);
      const destinationIndex = parseInt(row[1], 16);
      const registerS = parseInt(actualState.registers[registerSIndex], 2);
      const registerT = parseInt(actualState.registers[registerTIndex], 2);
      const operationResult = (registerS + registerT) & 0xff;
      newState.registers[destinationIndex] = operationResult
        .toString(2)
        .padStart(8, "0");
      return newState;
    }
    case "6":
      //6RST
      // Sumar en punto flotante los contenidos de los registros S y T y dejar el resultado en R
      const registerSIndex = parseInt(row[2], 16);
      const registerTIndex = parseInt(row[3], 16);
      const destinationIndex = parseInt(row[1], 16);
      const registerS = parseInt(actualState.registers[registerSIndex], 2);
      const registerT = parseInt(actualState.registers[registerTIndex], 2);
      // add like float number the registers S and T
      const operationResult = (registerS + registerT) & 0xff;
      newState.registers[destinationIndex] = operationResult
        .toString(2)
        .padStart(8, "0");
    case "7": // OR
      return applyBinaryOperation((s, t) => s | t, newState, row);
    case "8": // AND
      return applyBinaryOperation((s, t) => s & t, newState, row);
    case "9": // XOR
      return applyBinaryOperation((s, t) => s ^ t, newState, row);
    // AR0X
    // Rotar a derecha el contenido del registro R, X veces
    case "a": {
      const registerIndex = parseInt(row[1], 16);
      const registerValue = newState.registers[registerIndex];
      const length = registerValue.length;
      const shift = parseInt(row[3], 16);
      const rotations = shift % length;
      const extendedPattern = registerValue + registerValue;
      newState.registers[registerIndex] = extendedPattern.substring(
        length - rotations,
        2 * length - rotations
      );
      return newState; //Creo que se refiere a esto esta instruccion. Revisar
    }

    case "b":
      // BRXY
      // Saltar a la instrucción con dirección XY si el contenido del registro R es igual al del reg. 0
      const registerIndex = parseInt(row[1], 16);
      const memoryIndex = parseInt(row[2] + row[3], 16);
      if (newState.registers[registerIndex] === newState.registers[0]) {
        newState.programCounter = row[2] + row[3];
        newState.instructionRegister = newState.mainMemoryCells[memoryIndex];
      }
      return newState;
    case "c":
      // C000
      // Parar la ejecución
      // return newState; // por alguna razon esto hace que se vean todas las direcciones de memoria (osea bugelli)
      newState.programCounter = "-";
      newState.instructionRegister = "C000";
      newState.mainMemoryCells = [...actualState.mainMemoryCells];
      return newState;

    default:
      //TODO: Handle Error
      return actualState;
  }
}
