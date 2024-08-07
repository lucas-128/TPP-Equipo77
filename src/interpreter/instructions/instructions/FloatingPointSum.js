import { typeSimulations } from "../../constants";
import Instruction from "../Instruction";

/* 
Instruction: 6
Floating-point addition of the contents of registers S and T and store the result in register R.
*/

const exponentMap = new Map([
  ["111", 3],
  ["110", 2],
  ["101", 1],
  ["100", 0],
  ["011", -1],
  ["010", -2],
  ["001", -3],
  ["000", -4],
]);

function getKeyForValue(value) {
  for (const [key, mapValue] of exponentMap.entries()) {
    if (mapValue === value) {
      return key;
    }
  }
  return undefined;
}

export default class FloatingPointSum extends Instruction {
  constructor(registerS, registerT, destinationIndex) {
    super();
    this.registerS = registerS;
    this.registerT = registerT;
    this.destinationIndex = destinationIndex;
  }

  execute(oldState) {
    const newState = { ...oldState };
    newState.registers = [...oldState.registers];
    // const registerS = newState.registers[this.registerS];
    // const registerT = newState.registers[this.registerT];
    // console.log("Contenido de registro S", registerS);
    // console.log("Contenido de registro T", registerT);

    // Test con valores en binario
    const registerS = "01011010";
    const registerT = "01011010";

    // Interpretar binarios
    const reg1SignBit = registerS[0];
    const reg1ExponentBits = registerS.slice(1, 4);
    let reg1MantissaBits = registerS.slice(4);

    const reg2SignBit = registerT[0];
    const reg2ExponentBits = registerT.slice(1, 4);
    let reg2MantissaBits = registerT.slice(4);

    // Posicionar el radix point
    reg1MantissaBits = positionRadixPoint(reg1ExponentBits, reg1MantissaBits);
    reg2MantissaBits = positionRadixPoint(reg2ExponentBits, reg2MantissaBits);

    // Alinear mantisas
    let [alignedReg1Mantissa, alignedReg2Mantissa] = alignMantissas(
      reg1MantissaBits,
      reg2MantissaBits
    );

    // Determinal el signo de la operacion
    let operationResultSign = calculateResultSign(
      alignedReg1Mantissa,
      reg1SignBit,
      alignedReg2Mantissa,
      reg2SignBit
    );

    let resultMantissa;
    resultMantissa = calculateMantissa(
      reg1SignBit,
      reg2SignBit,
      resultMantissa,
      alignedReg1Mantissa,
      alignedReg2Mantissa
    );

    // Normalizar mantisa
    const normalizedMantissa = normalizeMantissa(resultMantissa);

    // Constuir resultado de operacion
    const operationResult =
      operationResultSign +
      getKeyForValue(normalizedMantissa.positionsMoved) +
      normalizedMantissa.adjustedValue;

    //
    console.log(operationResult);

    newState.registers[this.destinationIndex] = operationResult; //TODO: almacenar binarios en registros en vez de decimales?
    newState.programCounter += 1;
    return newState;
  }
}

function calculateMantissa(
  reg1SignBit,
  reg2SignBit,
  resultMantissa,
  alignedReg1Mantissa,
  alignedReg2Mantissa
) {
  if (reg1SignBit == reg2SignBit) {
    resultMantissa = addBinary(alignedReg1Mantissa, alignedReg2Mantissa);
  } else if (reg1SignBit === 1) {
    if (isBinaryGreater(alignedReg1Mantissa, alignedReg2Mantissa)) {
      resultMantissa = binarySubtract(alignedReg1Mantissa, alignedReg2Mantissa);
    } else {
      resultMantissa = binarySubtract(alignedReg2Mantissa, alignedReg1Mantissa);
    }
  } else {
    if (isBinaryGreater(alignedReg2Mantissa, alignedReg1Mantissa)) {
      resultMantissa = binarySubtract(alignedReg2Mantissa, alignedReg1Mantissa);
    } else {
      resultMantissa = binarySubtract(alignedReg1Mantissa, alignedReg2Mantissa);
    }
  }
  return resultMantissa;
}

function positionRadixPoint(exponentBits, mantissaBits) {
  const exponentValue = exponentMap.get(exponentBits);
  if (exponentValue !== undefined) {
    if (exponentValue > 0) {
      mantissaBits =
        mantissaBits.slice(0, exponentValue) +
        "." +
        mantissaBits.slice(exponentValue);
    } else {
      mantissaBits = "0." + "0".repeat(Math.abs(exponentValue)) + mantissaBits;
    }
  }
  return mantissaBits;
}

function alignMantissas(str1, str2) {
  let [left1, right1] = str1.split(".");
  let [left2, right2] = str2.split(".");

  let maxLeftLength = Math.max(left1.length, left2.length);
  let maxRightLength = Math.max(right1.length, right2.length);

  left1 = left1.padStart(maxLeftLength, "0");
  left2 = left2.padStart(maxLeftLength, "0");

  right1 = right1.padEnd(maxRightLength, "0");
  right2 = right2.padEnd(maxRightLength, "0");

  let alignedStr1 = `${left1}.${right1}`;
  let alignedStr2 = `${left2}.${right2}`;

  return [alignedStr1, alignedStr2];
}

function calculateResultSign(regSMantissa, regSSign, regTMantissa, regTSign) {
  if (regSSign == regTSign) {
    return regSSign;
  }

  if (regSSign === "1") {
    if (isBinaryGreater(regSMantissa, regTMantissa)) {
      return 1;
    } else {
      return 0;
    }
  } else {
    if (isBinaryGreater(regTMantissa, regSMantissa)) {
      return 1;
    } else {
      return 0;
    }
  }
}

function isBinaryGreater(value, valueToCompare) {
  const bin1 = value.replace(/\./g, "");
  const bin2 = valueToCompare.replace(/\./g, "");
  for (let i = 0; i < bin1.length; i++) {
    if (bin1[i] > bin2[i]) {
      return true;
    } else if (bin1[i] < bin2[i]) {
      return false;
    }
  }
  return false;
}

function binarySubtract(a, b) {
  const [aInt, aFrac = ""] = a.split(".");
  const [bInt, bFrac = ""] = b.split(".");

  const maxFracLength = Math.max(aFrac.length, bFrac.length);
  const aFracPadded = aFrac.padEnd(maxFracLength, "0");
  const bFracPadded = bFrac.padEnd(maxFracLength, "0");

  const maxIntLength = Math.max(aInt.length, bInt.length);
  const aIntPadded = aInt.padStart(maxIntLength, "0");
  const bIntPadded = bInt.padStart(maxIntLength, "0");

  const fracResult = subtractBinaryParts(aFracPadded, bFracPadded);
  const integerResult = subtractBinaryParts(
    aIntPadded,
    bIntPadded,
    fracResult.borrow
  );

  const resultFrac = fracResult.result;
  const resultInt = integerResult.result;
  const resultBorrow = integerResult.borrow;

  const finalFrac = resultFrac.replace(/^0+/, "") || "0";
  const finalInt = resultInt.replace(/^0+/, "") || "0";

  return resultBorrow === 0
    ? `${finalInt}.${finalFrac}`
    : "-" + finalInt + "." + finalFrac;
}

function subtractBinaryParts(a, b, borrow = 0) {
  const result = [];
  let currentBorrow = borrow;

  for (let i = a.length - 1; i >= 0; i--) {
    let diff = a[i] - b[i] - currentBorrow;

    if (diff < 0) {
      diff += 2;
      currentBorrow = 1;
    } else {
      currentBorrow = 0;
    }

    result.unshift(diff);
  }

  return { result: result.join("").replace(/^0+/, ""), borrow: currentBorrow };
}

function addBinary(bin1, bin2) {
  const [intPart1, fracPart1] = bin1.split(".");
  const [intPart2, fracPart2] = bin2.split(".");

  const { result: fracSum, carry: fracCarry } = addBinaryFraction(
    fracPart1,
    fracPart2
  );

  const { result: intSum } = addBinaryInteger(intPart1, intPart2, fracCarry);

  return intSum + "." + fracSum;
}

function addBinaryFraction(frac1, frac2) {
  let carry = 0;
  let result = "";

  for (let i = frac1.length - 1; i >= 0; i--) {
    const sum = parseInt(frac1[i], 2) + parseInt(frac2[i], 2) + carry;
    result = (sum % 2) + result;
    carry = Math.floor(sum / 2);
  }

  return { result, carry };
}

function addBinaryInteger(int1, int2, carry) {
  let result = "";

  for (let i = int1.length - 1; i >= 0; i--) {
    const sum = parseInt(int1[i], 2) + parseInt(int2[i], 2) + carry;
    result = (sum % 2) + result;
    carry = Math.floor(sum / 2);
  }

  if (carry) {
    result = "1" + result;
  }

  return { result };
}

function normalizeMantissa(value) {
  const strippedValue = value.replace(/^0+/, "");
  const decimalIndex = strippedValue.indexOf(".");
  let binaryString = strippedValue.replace(".", "");
  if (binaryString.length === 0 || binaryString.indexOf("1") === -1) {
    return { adjustedValue: "", positionsMoved: 0 };
  }
  const firstOneIndex = binaryString.indexOf("1");

  let positionsMoved = 0;
  if (decimalIndex !== -1) {
    const positionsBeforeFirstOne = firstOneIndex - decimalIndex;
    positionsMoved = -positionsBeforeFirstOne;
  } else {
    positionsMoved = -firstOneIndex;
  }

  let adjustedValue = binaryString.slice(firstOneIndex, firstOneIndex + 4);

  if (adjustedValue.length < 4) {
    adjustedValue = adjustedValue.padEnd(4, "0");
  }

  return { adjustedValue: adjustedValue, positionsMoved: positionsMoved };
}
