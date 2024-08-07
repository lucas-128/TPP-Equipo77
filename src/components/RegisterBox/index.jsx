import React from "react";
import { useSelector } from "react-redux";
import {
  MainContainer,
  CustomHandle,
  RegisterContainer,
  TitleContainer,
  RegistersContainer,
  TitleText,
  RegisterNumeration,
  RegisterValue,
} from "./styled.jsx";
import { registersId } from "../../containers/SimulatorSection/components.jsx";

export const RegisterBox = ({ id, data }) => {
  const registers = useSelector((state) => state.application.registers);

  function formatValue(value) {
    if (value === null) {
      return "-";
    } else if (typeof value === "number" && !Number.isInteger(value)) {
      // Convert float to an 8-bit approximation (this is not exact)
      return convertTo8BitFloat(value);
    } else if (Number.isInteger(value)) {
      // Convert integer to 8-bit binary string
      return value.toString(2).padStart(8, "0");
    } else {
      return "-";
    }
  }

  function convertTo8BitFloat(decimalNumber) {
    if (decimalNumber === 0) {
      return "00000000";
    }
    // Step 1: Determine the sign bit
    const signBit = decimalNumber >= 0 ? "0" : "1";
    decimalNumber = Math.abs(decimalNumber);

    // Step 2: Normalize the number
    const exponentBias = 3;
    const exponentBits = 3;
    const mantissaBits = 4;

    // Convert decimal to binary representation
    let exponent;
    if (decimalNumber >= 1) {
      exponent = Math.floor(Math.log2(decimalNumber));
    } else {
      exponent = -Math.floor(Math.log2(decimalNumber)) - 1;
    }

    // Calculate normalized value and exponent
    const normalizedValue = decimalNumber / Math.pow(2, exponent);
    const exponentValue = exponent + exponentBias;

    // Step 3: Calculate the exponent bits
    if (exponentValue < 0 || exponentValue >= Math.pow(2, exponentBits)) {
      throw new Error("Exponent out of range for 3-bit exponent");
    }

    const exponentBin = exponentValue.toString(2).padStart(exponentBits, "0");

    // Step 4: Calculate the mantissa bits
    let mantissa = normalizedValue - 1;
    let mantissaBin = "";
    for (let i = 0; i < mantissaBits; i++) {
      mantissa *= 2;
      const bit = Math.floor(mantissa);
      mantissaBin += bit;
      mantissa -= bit;
    }

    // Combine sign, exponent, and mantissa
    const floatRepresentation = signBit + exponentBin + mantissaBin;

    return floatRepresentation;
  }

  return (
    <>
      <MainContainer id={registersId}>
        <TitleContainer>
          <TitleText>Registros</TitleText>
        </TitleContainer>
        <RegistersContainer>
          {registers.map((value, i) => (
            <RegisterContainer key={i}>
              <RegisterNumeration>{i}</RegisterNumeration>
              <RegisterValue>{formatValue(value)}</RegisterValue>
            </RegisterContainer>
          ))}
        </RegistersContainer>
      </MainContainer>
      <CustomHandle
        type="target"
        position="right"
        style={{ background: "#555" }}
      />
      <CustomHandle
        type="source"
        position="bottom"
        style={{ background: "#555" }}
      />
      {/*<CustomHandle
        type="target"
        position="bottom"
        style={{ background: "#555" }}
      />*/}
    </>
  );
};
