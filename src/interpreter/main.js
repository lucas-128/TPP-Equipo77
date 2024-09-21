// import { getStateAfterInstruction } from "./instructions.js";
import { instructionCodes } from "./constants.js";

export function validateSyntax(code) {
  let rows = splitCode(code)
    .filter((row) => row.length > 0)
    .map((row) => row.toLowerCase());
  return isValidCode(rows);
}

export function splitCode(text) {
  return text.split(/\r?\n/).map((row) => {
    return row.trim().length > 0
      ? row.trim().substring(0, 4)
      : row.substring(0, 4);
  });
}

// export const getNewState = (actualState, line, selectedLine) => {
//   const lineSplit = line.split("");
//   const instruction = lineSplit[0].toLowerCase();
//   const newState = getStateAfterInstruction(
//     actualState,
//     instruction,
//     lineSplit,
//     selectedLine,
//   );
//   return newState;
// };

function isValidCode(rows) {
  return rows.every((row) => {
    return (
      validateLength(row) &&
      validateInstructionCode(row) &&
      validatePattern(row)
    );
  });
}

function validateLength(row) {
  return row.length === 4;
}

function validateInstructionCode(row) {
  const rowSplit = row.split("");
  const instruction = rowSplit[0].toLowerCase();
  return instructionCodes.includes(instruction);
}

function validatePattern(row) {
  const rowSplit = row.split("").map((r) => r.toLowerCase());
  const instruccion = rowSplit[0];
  // pattern RXY o RST
  if (
    ["1", "2", "3", "5", "6", "7", "8", "9", "a", "b"].includes(instruccion)
  ) {
    return validateIfHexa(rowSplit[1])
      ? validateParameters(instruccion, row.slice(2, 4))
      : false;
  } else if (instruccion === "4") {
    return (
      rowSplit[1] === "0" &&
      validateIfHexa(rowSplit[2]) &&
      validateIfHexa(rowSplit[3])
    );
  } else if (instruccion === "c") {
    return row.slice(1, 4) === "000";
  }
  return true;
}

function validateParameters(instruccion, parameters) {
  if (["1", "2", "3", "5", "6", "7", "8", "9", "b"].includes(instruccion)) {
    return validateIfHexa(parameters[0]) && validateIfHexa(parameters[1]);
  } else if (instruccion === "a") {
    return parameters[0] === "0" && validateIfHexa(parameters[1]);
  }
  return false;
}

function validateIfHexa(register) {
  return [
    "0",
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
    "d",
    "e",
    "f",
  ].includes(register);
}
