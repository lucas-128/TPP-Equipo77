import { operationNames, CACHE_SIZE } from "./constants";

export function applyBinaryOperation(instruction, operation, actualState) {
  const newState = { ...actualState, registers: [...actualState.registers] };

  // const registerS = parseInt(
  //   actualState.registers[instruction.registerSIndex],
  //   2
  // );

  const registerS = parseInt(
    actualState.registers[instruction.registerSIndex],
    16
  )
    .toString(2)
    .padStart(8, "0");

  // const registerT = parseInt(
  //   actualState.registers[instruction.registerTIndex],
  //   2
  // );

  const registerT = parseInt(
    actualState.registers[instruction.registerTIndex],
    16
  )
    .toString(2)
    .padStart(8, "0");

  const operationResult = operation(registerS, registerT).toString(2);
  const paddedOperationResult = operationResult.slice(0, 8).padStart(8, "0");

  const hexValue = parseInt(paddedOperationResult, 2)
    .toString(16)
    .toUpperCase();

  newState.aluOperation = {
    operation: operationNames[instruction.type],
    registerS: actualState.registers[instruction.registerSIndex],
    registerT: actualState.registers[instruction.registerTIndex],
    registerSIndex: instruction.registerSIndex,
    registerTIndex: instruction.registerTIndex,
    destinationIndex: instruction.destinationIndex,
    result: operationResult,
  };
  newState.registers[instruction.destinationIndex] = hexValue;
  return newState;
}

export function updateCache(oldExecuteState, memoryAddress) {
  const { cacheMemoryCells } = oldExecuteState;
  let newCacheMemoryCells = [...cacheMemoryCells];
  newCacheMemoryCells = cacheMemoryCells.filter((cell) =>
    cell ? cell.address !== memoryAddress : true
  );
  while (newCacheMemoryCells.length < CACHE_SIZE) {
    newCacheMemoryCells.push({
      [newCacheMemoryCells.length]: null,
    });
  }
  newCacheMemoryCells.pop();
  newCacheMemoryCells.unshift({
    address: memoryAddress,
    content: oldExecuteState.mainMemoryCells[memoryAddress],
  });

  return newCacheMemoryCells;
}

export function toHexa(value) {
  return value.toString(16).toUpperCase();
};

export function toHexaPadStart(value) {
  return value.toString(16).toUpperCase().padStart(2, "0");
};

export function toBinary(value) {
  return parseInt(value, 16).toString(2).toUpperCase().padStart(8, "0");
};
