const instructions = {
  //1RXY
  1: [
    "Cargar en el registro R el contenido de la celda con dirección XY",
    "Cargar en el registro ",
    " el contenido de la celda con dirección ",
  ],
  //2RXY
  2: [
    "Cargar en el registro R el patrón XY",
    "Cargar en el registro ",
    " el patrón ",
  ],
  //3RXY
  3: [
    "Almacenar el contenido del registro R en la celda con dirección XY",
    "Almacenar el contenido del registro ",
    " en la celda con dirección ",
  ],
  //40RS
  4: [
    "Copiar el contenido del registro R en el registro S",
    "Copiar el contenido del registro ",
    " en el registro ",
  ],
  //5RST
  5: [
    "Sumar en complemento a 2 los contenidos de los registros S y T y dejar el resultado en R",
    "Sumar en complemento a 2 los contenidos de los registros ",
    " y ",
    " y dejar el resultado en ",
  ],
  //6RST
  6: [
    "Sumar en punto flotante los contenidos de los registros S y T y dejar el resultado en R",
    "Sumar en punto flotante los contenidos de los registros ",
    " y ",
    " y dejar el resultado en ",
  ],
  //7RST
  7: [
    "Disyunción (OR) de los contenidos de los registros S y T con resultado en registro R",
    "Disyunción (OR) de los contenidos de los registros ",
    " y ",
    " con resultado en registro ",
  ],
  //8RST
  8: [
    "Conjunción (AND) de los contenidos de los registros S y T con resultado en registro R",
    "Conjunción (AND) de los contenidos de los registros ",
    " y ",
    " con resultado en registro ",
  ],
  //9RST
  9: [
    "Disyunción exc. (XOR) de los contenidos de los registros S y T con resultado en registro R",
    "Disyunción exc. (XOR) de los contenidos de los registros ",
    " y ",
    " con resultado en registro ",
  ],
  //AR0X
  a: [
    "Rotar a derecha el contenido del registro R, X veces",
    "Rotar a derecha el contenido del registro ",
    ", ",
    " veces",
  ],
  //BRXY
  b: [
    "Saltar a la instrucción con dirección XY si el contenido del registro R es igual al del reg. 0",
    "Saltar a la instrucción con dirección ",
    " si el contenido del registro ",
    " es igual al del reg. 0",
  ],
  //C000
  c: ["Parar la ejecución"],
};

export const instructionCodes = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
];

export function getInstructionLog(actualState, instruction, row) {
  switch (instruction) {
    case "1":
      // 1RXY
      // Cargar en el registro R el contenido de la celda con dirección XY
      return (
        instructions[instruction][1] +
        row[1] +
        instructions[instruction][2] +
        row[2] +
        row[3]
      );
    case "2":
      // 2RXY
      // Cargar en el registro R el patrón XY
      return (
        instructions[instruction][1] +
        row[1] +
        instructions[instruction][2] +
        row[2] +
        row[3]
      );
    case "3":
      // 3RXY
      // Almacenar el contenido del registro R en la celda con dirección XY
      return (
        instructions[instruction][1] +
        row[1] +
        instructions[instruction][2] +
        row[2] +
        row[3]
      );
    case "4":
      // 40RS
      // Copiar el contenido del registro R en el registro S
      return (
        instructions[instruction][1] +
        row[2] +
        instructions[instruction][2] +
        row[3]
      );
    case "5":
      // 5RST
      // Sumar en complemento a 2 los contenidos de los registros S y T y dejar el resultado en R
      return (
        instructions[instruction][1] +
        row[2] +
        instructions[instruction][2] +
        row[3] +
        instructions[instruction][3] +
        row[1]
      );
    case "6":
      //6RST
      // Sumar en punto flotante los contenidos de los registros S y T y dejar el resultado en R
      return (
        instructions[instruction][1] +
        row[2] +
        instructions[instruction][2] +
        row[3] +
        instructions[instruction][3] +
        row[1]
      );
    case "7":
      //7RST
      // Disyunción (OR) de los contenidos de los registros S y T con resultado en registro R
      return (
        instructions[instruction][1] +
        row[2] +
        instructions[instruction][2] +
        row[3] +
        instructions[instruction][3] +
        row[1]
      );
    case "8":
      // 8RST
      // Conjunción (AND) de los contenidos de los registros S y T con resultado en registro R
      return (
        instructions[instruction][1] +
        row[2] +
        instructions[instruction][2] +
        row[3] +
        instructions[instruction][3] +
        row[1]
      );
    case "9":
      // 9RST
      // Disyunción exc. (XOR) de los contenidos de los registros S y T con resultado en registro R
      return (
        instructions[instruction][1] +
        row[2] +
        instructions[instruction][2] +
        row[3] +
        instructions[instruction][3] +
        row[1]
      );
    case "a":
      // AR0X
      // Rotar a derecha el contenido del registro R, X veces
      return (
        instructions[instruction][1] +
        row[1] +
        instructions[instruction][2] +
        row[3] +
        instructions[instruction][3]
      );
    case "b":
      // BRXY
      // Saltar a la instrucción con dirección XY si el contenido del registro R es igual al del reg. 0
      return (
        instructions[instruction][1] +
        row[2] +
        row[3] +
        instructions[instruction][2] +
        row[1] +
        instructions[instruction][3]
      );
    case "c":
      // C000
      // Parar la ejecución
      return instructions[instruction][0];
  }
}

export function getStateAfterInstruction(actualState, instruction, row) {
  let newState = { ...actualState };
  switch (instruction) {
    case "1":
      newState.registers = [...actualState.registers];
      newState.registers[parseInt(row[1], 16)] = row[2] + row[3]; //TODO: This should be Input Port value
      return newState;
    case "2":
      newState.registers = [...actualState.registers];
      newState.registers[parseInt(row[1], 16)] = row[2] + row[3];
      return newState;
    case "3":
      // 3RXY
      // Almacenar el contenido del registro R en la celda con dirección XY
      newState.registers = [...actualState.registers];
      //newState.memory[row[2] + row[3]] = actualState.registers[row[1]]; //TODO: Agregar la memoria
      return newState;
    case "4":
      // 40RS
      // Copiar el contenido del registro R en el registro S
      newState.registers = [...actualState.registers];
      newState.registers[row[3]] = actualState.registers[row[2]];
      return newState;
    case "5":
    // 5RST
    // Sumar en complemento a 2 los contenidos de los registros S y T y dejar el resultado en R

    case "6":
    //6RST
    // Sumar en punto flotante los contenidos de los registros S y T y dejar el resultado en R

    case "7":
    //7RST
    // Disyunción (OR) de los contenidos de los registros S y T con resultado en registro R

    case "8":
    // 8RST
    // Conjunción (AND) de los contenidos de los registros S y T con resultado en registro R

    case "9":
    // 9RST
    // Disyunción exc. (XOR) de los contenidos de los registros S y T con resultado en registro R

    case "a":
    // AR0X
    // Rotar a derecha el contenido del registro R, X veces

    case "b":
    // BRXY
    // Saltar a la instrucción con dirección XY si el contenido del registro R es igual al del reg. 0

    case "c":
      // C000
      // Parar la ejecución
      return instructions[instruction][0];

    default:
      //TODO: Handle Error
      return actualState;
  }
}
