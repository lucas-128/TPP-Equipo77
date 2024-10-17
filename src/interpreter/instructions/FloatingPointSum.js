import Instruction from "../Instruction";
import { animationsAlu } from "../constants";
import { applyBinaryOperation, toHexa, animationsAluData } from "../utils";

/* 
Instruction: 6
Floating-point addition of the contents of registers S and T and store the result in register R.
*/

export default class FloatingPointSum extends Instruction {
  constructor(type, registerSIndex, registerTIndex, register, id) {
    super(type, id);
    this.registerSIndex = registerSIndex;
    this.registerTIndex = registerTIndex;
    this.destinationIndex = register;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.instructionId = this.id + 1;
    newExecuteState.edgeAnimation = animationsAlu;

    const resultNewExecuteState = applyBinaryOperation(
      this,
      floatingPointSum,
      newExecuteState
    );

    resultNewExecuteState.edgeAnimation = animationsAluData(
      this.registerSIndex,
      resultNewExecuteState.registers[this.registerSIndex],
      this.registerTIndex,
      resultNewExecuteState.registers[this.registerTIndex],
      this.destinationIndex,
      resultNewExecuteState.registers[this.destinationIndex]
    );

    return {
      ...oldState,
      execute: resultNewExecuteState,
    };
  }

  toString() {
    return [
      ["Opcode: ", "6 (ADD FLOAT)"],
      ["Operando 1: ", "Registro " + toHexa(this.registerSIndex)],
      ["Operando 2: ", "Registro " + toHexa(this.registerTIndex)],
      ["Destino: ", "Registro " + toHexa(this.destinationIndex)],
    ];
  }
}

// registerS + register T
function floatingPointSum(registerS, registerT) {
  // esta funcion tiene que pinchar como el comp2 si hay overflow
  // si hay underflow del exponente, todo 0
  // manejar el signo opuesto
  // tiene que devolver el resultado final que se guarda en el registro (res_string)

  const parsedS = parseRegister(registerS);
  const parsedT = parseRegister(registerT);

  console.log(parsedS);
  console.log(parsedT);

  let resultSign = "0";

  // register1: newBiggerRegister,
  // register2: newSmallerRegister,
  let alignedRegisters = alignMantissas(parsedS, parsedT);
  let diffSigns = parsedS.sign !== parsedT.sign;

  // if diff signos -> comp 2 al smaller register
  if (diffSigns) {
    alignedRegisters.register2.mantissa.implied = twosComplementMantissa(
      alignedRegisters.register2.mantissa.implied
    );
  }

  let resultMantissa = addBinary(
    alignedRegisters.register1.mantissa.implied,
    alignedRegisters.register2.mantissa.implied
  );

  console.log("res mantisa post suma: ", resultMantissa);

  if (diffSigns) {
    if (hasCarry(resultMantissa)) {
      console.log("tienen signo dif y hay acarreo");
      resultSign = "0";
      resultMantissa = resultMantissa.slice(1);
    } else {
      console.log("tienen signo dif pero no hay acarreo");
      resultSign = "1";
    }
  } else {
    console.log("tienen mismo sig");
    // nada
  }

  console.log("res mantisa post sign check: ", resultMantissa);

  const [normalizedMantissa, placesMoved] = normalizeMantissa(resultMantissa);

  console.log("normalized tisa", normalizedMantissa);

  const resultExponent = toBiasBinary(
    alignedRegisters.register1.exponent.decimal + placesMoved,
    3,
    3
  );

  const resultNormalizedMantissa = normalizedMantissa
    .split(".")[1]
    .substring(0, 4);

  const res_string = resultSign + resultExponent + resultNormalizedMantissa;

  const result = parseInt(
    resultSign + resultExponent + resultNormalizedMantissa,
    2
  );

  console.log("res: ", res_string);
  return res_string;
}

/*
Exponente sesgado:
000	-3
001	-2
010	-1
011	 0
100	 1
101	 2
110	 3
111	 4
*/

export function parseRegister(register) {
  const sign = parseInt(register[0], 2);

  const exponentStr = register.slice(1, 4);
  const exponentDecimal = parseInt(exponentStr, 2) - 3;

  const mantissa = register.slice(4, 8);
  const mantissaWithImpliedBit = `1.${mantissa}`;

  return {
    sign,
    exponent: {
      raw: exponentStr,
      decimal: exponentDecimal,
    },
    mantissa: {
      raw: mantissa,
      implied: mantissaWithImpliedBit,
    },
  };
}

function getResultExponent(register1, register2) {
  const exponent1 = register1.exponent.decimal;
  const exponent2 = register2.exponent.decimal;
  return Math.max(exponent1, exponent2);
}

export function alignMantissas(register1, register2) {
  const exp1 = register1.exponent.decimal;
  const exp2 = register2.exponent.decimal;

  if (exp1 === exp2) {
    return {
      register1,
      register2,
    };
  }

  const maxExponent = getResultExponent(register1, register2);
  const alignmentValue =
    exp1 !== maxExponent ? maxExponent - exp1 : maxExponent - exp2;

  const smallerExponentRegister = exp1 < exp2 ? register1 : register2;
  const biggerExponentRegister = exp1 > exp2 ? register1 : register2;
  const smallerMantissa = smallerExponentRegister.mantissa.implied;

  const alignedSmallerMantissa = movePoint(smallerMantissa, alignmentValue);

  const alignedMantissas = padBinaryStrings(
    alignedSmallerMantissa,
    biggerExponentRegister.mantissa.implied
  );

  const newBiggerRegister = {
    ...biggerExponentRegister,
    mantissa: {
      ...biggerExponentRegister.mantissa,
      implied: alignedMantissas[1],
    },
  };

  const newSmallerRegister = {
    ...biggerExponentRegister,
    mantissa: {
      raw: smallerExponentRegister.mantissa.raw,
      implied: alignedMantissas[0],
    },
  };

  return {
    register1: newBiggerRegister,
    register2: newSmallerRegister,
  };
}

function movePoint(binaryString, n) {
  let [integerPart, fractionalPart] = binaryString.split(".");
  integerPart = "0".repeat(n) + integerPart;
  return integerPart.charAt(0) + "." + integerPart.slice(1) + fractionalPart;
}

function padBinaryStrings(str1, str2) {
  const [int1, frac1] = str1.split(".");
  const [int2, frac2] = str2.split(".");

  const maxIntLength = Math.max(int1.length, int2.length);
  const maxFracLength = Math.max(
    frac1 ? frac1.length : 0,
    frac2 ? frac2.length : 0
  );

  const paddedInt1 = int1.padStart(maxIntLength, "0");
  const paddedInt2 = int2.padStart(maxIntLength, "0");

  const paddedFrac1 = (frac1 || "").padEnd(maxFracLength, "0");
  const paddedFrac2 = (frac2 || "").padEnd(maxFracLength, "0");

  return [`${paddedInt1}.${paddedFrac1}`, `${paddedInt2}.${paddedFrac2}`];
}

export function addBinary(bin1, bin2) {
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

function invertBinaryString(binaryStr) {
  return binaryStr
    .split("")
    .map((char) => (char === "0" ? "1" : char === "1" ? "0" : char))
    .join("");
}

function hasCarry(str) {
  const dotIndex = str.indexOf(".");
  return dotIndex > 1;
}

function twosComplementMantissa(register) {
  const inverted = invertBinaryString(register);
  const result = addBinary(inverted, "0.0001");
  return result;
}

/*
export function normalizeMantissa(s) {
  const dotIndex = s.indexOf(".");
  const firstOneIndex = s.indexOf("1");
  if (dotIndex === -1 || firstOneIndex === -1) {
    return [s, 0];
  }

  let newDotIndex;
  let movedValue;
  if (dotIndex <= firstOneIndex) {
    newDotIndex = firstOneIndex + 1;
    movedValue = newDotIndex - dotIndex;
  } else {
    newDotIndex = firstOneIndex + 1;
    movedValue = newDotIndex - dotIndex;
  }

  let leftPart = s.slice(0, dotIndex);
  let rightPart = s.slice(dotIndex + 1);
  let newString = leftPart + rightPart;
  newString =
    newString.slice(0, newDotIndex) + "." + newString.slice(newDotIndex);

  return [newString, -movedValue];
}
*/

export function normalizeMantissa(binaryStr) {
  const firstOneIndex = binaryStr.indexOf("1");

  // If no '1' is found, return the default values
  if (firstOneIndex === -1) {
    return ["0.0000", 0];
  }

  const dotIndex = binaryStr.indexOf(".");
  let binaryWithoutDot = binaryStr.replace(".", "");

  // Remove leading zeros
  let trimmedBinary = binaryWithoutDot.replace(/^0+/, "");

  // Add the decimal point after the first digit
  let processedString =
    trimmedBinary.slice(0, 1) + "." + trimmedBinary.slice(1);

  // Calculate the displacement of the '.'
  const displacement =
    dotIndex < firstOneIndex
      ? firstOneIndex - dotIndex
      : firstOneIndex + 1 - dotIndex;

  // Adjust the decimal part to ensure it's 4 characters long
  let parts = processedString.split(".");
  if (parts.length === 2) {
    let decimalPart = parts[1];

    // Ensure the decimal part has exactly 4 characters
    decimalPart =
      decimalPart.length < 4
        ? decimalPart.padEnd(4, "0")
        : decimalPart.slice(0, 4);

    processedString = parts[0] + "." + decimalPart;
  }

  return [processedString, displacement];
}

export function toBiasBinary(value, bias, bitWidth) {
  const adjustedValue = parseInt(value) + bias;
  return adjustedValue.toString(2).padStart(bitWidth, "0");
}

/*
function floatingPointSum(registerS, registerT) {
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
  return operationResult;
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

  let adjustedValue = binaryString.slice(firstOneIndex);

  if (adjustedValue.length < 4) {
    adjustedValue = adjustedValue.padEnd(4, "0");
  }

  return { adjustedValue: adjustedValue, positionsMoved: positionsMoved };
}
*/
