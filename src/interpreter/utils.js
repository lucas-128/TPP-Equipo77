import { operationNames, CACHE_SIZE } from "./constants";
import {
  aluRegistersId,
  registerAluBottomId,
  registerAluTopId,
} from "../containers/SimulatorSection/components";

export function applyBinaryOperation(instruction, operation, actualState) {
  const newState = { ...actualState, registers: [...actualState.registers] };

  const registerS = parseInt(
    actualState.registers[instruction.registerSIndex],
    16
  )
    .toString(2)
    .padStart(8, "0");

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
    result: paddedOperationResult,
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

// Combines the two caches without duplicates
export function combineCaches(executeCache, fetchCache) {
  const newCacheMemoryCells = [...executeCache];
  fetchCache.forEach((cell) => {
    if (!cell) {
      return;
    }
    if (!newCacheMemoryCells.find((e) => e && e.address === cell.address)) {
      newCacheMemoryCells.pop();
      newCacheMemoryCells.unshift(cell);
    }
  });

  return newCacheMemoryCells;
}

export const animationsAluData = (
  registerRAddr,
  registerRData,
  registerTAddr,
  registerTData,
  registerDestIndex,
  registerDestData
) => {
  const aluData = [
    { id: registerAluTopId, address: registerRAddr, data: registerRData },
    {
      id: aluRegistersId,
      address: registerDestIndex,
      data: registerDestData,
    },
  ];

  if (registerTAddr) {
    aluData.push({
      id: registerAluBottomId,
      address: registerTAddr,
      data: registerTData,
    });
  }
  return aluData;
};

export function toHexa(value) {
  return value.toString(16).toUpperCase();
}

export function toHexaPadStart(value) {
  return value.toString(16).toUpperCase().padStart(2, "0");
}

export function toBinary(value) {
  return parseInt(value, 16).toString(2).toUpperCase().padStart(8, "0");
}

export function toBinaryComplement(value) {
  if (value >= 0) {
    return toBinary(value);
  } else {
    const positiveBinary = Math.abs(value).toString(2).padStart(8, "0");
    const invertedBinary = positiveBinary
      .split("")
      .map((bit) => (bit === "0" ? "1" : "0"))
      .join("");
    const binaryCOmplement = (parseInt(invertedBinary, 2) + 1)
      .toString(2)
      .padStart(8, "0");
    return binaryCOmplement;
  }
}
