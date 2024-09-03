import React, { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentState } from "../../slices/applicationSlice";
import {
  BodyContainer,
  Container,
  ErrorMessage,
  FooterContainer,
  Input,
  Line,
  RadioGroup,
  RadioInput,
  RadioLabel,
  Text,
} from "./styled";
import { Button } from "../Button";

export const InputPortModal = () => {
  const dispatch = useDispatch();
  const applicationState = useSelector((state) => state.application);
  const showModal = useSelector(
    (state) => state.application.execute.showInputPort
  );
  const [inputValue, setInputValue] = useState("");
  const [numericBase, setNumericBase] = useState("decimal");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setError("");
    setNumericBase(event.target.value);
  };

  const errorMessages = {
    empty: "El valor no puede estar vacío",
    outOfRange: "El valor debe estar entre -128 y 127",
    containsLetters: "El valor no puede contener letras",
    invalidBinary: "El valor solo puede contener unos y ceros",
    invalidBitLength: "El valor debe tener exactamente 8 bits",
    invalidHex: "El valor debe estar en base hexadecimal y tener 1 o 2 dígitos",
    invalidValue: "Tipo de valor no válido",
  };

  const isValidDecimal = (value) => {
    const numericValue = parseInt(value, 10);
    if (numericValue < -128 || numericValue > 127) {
      setError(errorMessages.outOfRange);
      return false;
    }
    if (!/^-?\d+$/.test(value)) {
      setError(errorMessages.containsLetters);
      return false;
    }
    return true;
  };

  const isValidBinary = (value) => {
    if (!/^[01]+$/.test(value)) {
      setError(errorMessages.invalidBinary);
      return false;
    }
    if (value.length !== 8) {
      setError(errorMessages.invalidBitLength);
      return false;
    }
    return true;
  };

  const isValidHex = (value) => {
    if (!/^[0-9A-Fa-f]{1,2}$/.test(value)) {
      setError(errorMessages.invalidHex);
      return false;
    }
    const hexValue = parseInt(value, 16);
    if (hexValue < -128 || hexValue > 127) {
      setError(errorMessages.outOfRange);
      return false;
    }
    return true;
  };

  const isValidInput = () => {
    if (inputValue === "") {
      setError(errorMessages.empty);
      return false;
    }

    switch (numericBase) {
      case "decimal":
        return isValidDecimal(inputValue);
      case "binario":
        return isValidBinary(inputValue);
      case "hexa":
        return isValidHex(inputValue);
      default:
        setError(errorMessages.invalidValue);
        return false;
    }
  };

  const getHexaValue = () => {
    if (numericBase === "decimal") {
      return parseInt(inputValue).toString(16).toUpperCase();
    } else if (numericBase === "binario") {
      return parseInt(inputValue, 2).toString(16).toUpperCase();
    } else if (numericBase === "hexa") {
      return inputValue.toUpperCase();
    }
  };

  const handleSave = () => {
    if (!isValidInput()) return;
    setInputValue("");
    const {
      execute: currentExecuteState,
      fetch: { instructionRegister },
    } = applicationState;
    const newExecuteState = {
      ...currentExecuteState,
      registers: [...currentExecuteState.registers],
      mainMemoryCells: [...currentExecuteState.mainMemoryCells],
      showInputPort: false,
    };

    const newValue = getHexaValue();
    const registerToUpdate = parseInt(instructionRegister.slice(1, 2), 16);
    newExecuteState.registers[registerToUpdate] = newValue;
    newExecuteState.mainMemoryCells[254] = newValue;
    const newState = {
      ...applicationState,
      execute: newExecuteState,
    };
    dispatch(updateCurrentState(newState));
    setError("");
  };

  return (
    showModal && (
      <Modal title={"Puerto de entrada"} msg={null}>
        <Container>
          <BodyContainer>
            <Text>Valor de entrada</Text>
            <Input
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              $hasError={error !== ""}
            />
            <ErrorMessage>{error}</ErrorMessage>

            <RadioGroup>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="number-system"
                  value="decimal"
                  checked={numericBase === "decimal"}
                  onChange={handleChange}
                />
                Decimal
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="number-system"
                  value="binario"
                  checked={numericBase === "binario"}
                  onChange={handleChange}
                />
                Binario
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="number-system"
                  value="hexa"
                  checked={numericBase === "hexa"}
                  onChange={handleChange}
                />
                Hexadecimal
              </RadioLabel>
            </RadioGroup>
          </BodyContainer>
          <Line />
          <FooterContainer>
            <Button onClick={handleSave}>Enviar</Button>
          </FooterContainer>
        </Container>
      </Modal>
    )
  );
};
