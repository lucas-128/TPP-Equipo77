import { getStateAfterInstruction } from "./instructions.js";
import { instructionCodes } from "./instructions.js";

export function validateSyntax(code) {
  let rows = splitCode(code);
  return validateCode(rows);
}

function splitCode(text) {
  return text.split("\n").map((row) => {
    return row.trim.length > 0 ? row.trim() : row;
  });
}

export const getNewState = (actualState, line) => {
  const lineSplit = line.split("");
  const instruction = lineSplit[0].toLowerCase();
  const newState = getStateAfterInstruction(
    actualState,
    instruction,
    lineSplit
  );
  return newState;
};

function validateCode(rows) {
  return rows.every((row) => {
    return (
      validateLength(row) &&
      validateInstructionCode(row) &&
      validatePattern(row)
    );
  });
}

function validateLength(row) {
  if (row.length !== 4) {
    throwError("Invalid instruction length for " + row);
    return false;
  }
  return true;
}

function validateInstructionCode(row) {
  const rowSplit = row.split("");
  const instruction = rowSplit[0].toLowerCase();
  if (!instructionCodes.includes(instruction)) {
    throwError("Invalid instruction code in " + instruction);
    return false;
  }
  return true;
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

function throwError(message) {
  alert(message);
}
