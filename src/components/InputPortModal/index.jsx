import React, { useRef, useState, useEffect } from "react";
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
import { toHexa } from "../../interpreter/utils";
import { numericBaseType } from "../../interpreter/constants";

export const InputPortModal = () => {
  const dispatch = useDispatch();
  const applicationState = useSelector((state) => state.application);
  const showModal = useSelector(
    (state) => state.application.execute.showInputPort
  );

  const updateRegister = useSelector(
    (state) => state.application.execute.registerToUpdate
  );

  const [inputValue, setInputValue] = useState("");
  const [numericBase, setNumericBase] = useState(numericBaseType.DECIMAL);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setError("");
    setNumericBase(event.target.value);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal]);

  const errorMessages = {
    empty: "El valor no puede estar vacío",
    outOfRange: "El valor debe estar entre -128 y 127",
    outOfRangeHexa: "El valor debe estar entre 0 y FF",
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
    if (!/^[0-9A-Fa-f]+$/.test(value)) {
      setError(errorMessages.invalidHex);
      return false;
    }
    const hexValue = parseInt(value, 16);
    if (hexValue < 0 || hexValue > 255) {
      setError(errorMessages.outOfRangeHexa);
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
      case numericBaseType.DECIMAL:
        return isValidDecimal(inputValue);
      case numericBaseType.BINARY:
        return isValidBinary(inputValue);
      case numericBaseType.HEXA:
        return isValidHex(inputValue);
      default:
        setError(errorMessages.invalidValue);
        return false;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const getHexaValue = () => {
    if (numericBase === numericBaseType.DECIMAL) {
      return parseInt(inputValue) < 0
        ? toHexa(256 + parseInt(inputValue))
        : toHexa(parseInt(inputValue));
    } else if (numericBase === numericBaseType.BINARY) {
      return parseInt(inputValue, 2).toString(16).toUpperCase();
    } else if (numericBase === numericBaseType.HEXA) {
      return inputValue.toUpperCase();
    }
  };

  const handleSave = () => {
    if (!isValidInput()) return;
    setInputValue("");
    const { execute: currentExecuteState } = applicationState;
    const newExecuteState = {
      ...currentExecuteState,
      registers: [...currentExecuteState.registers],
      mainMemoryCells: [...currentExecuteState.mainMemoryCells],
      showInputPort: false,
      registerToUpdate: null,
    };

    const newValue = getHexaValue();
    newExecuteState.registers[updateRegister] = newValue;
    newExecuteState.mainMemoryCells[254] = newValue;
    const newState = {
      ...applicationState,
      execute: newExecuteState,
    };
    dispatch(updateCurrentState(newState));
    setError("");
    setNumericBase(numericBaseType.DECIMAL);
  };

  return (
    showModal && (
      <Modal title={"Puerto de entrada"} msg={null}>
        <Container>
          <BodyContainer>
            <Text>Valor de entrada</Text>
            <Input
              ref={inputRef}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              value={inputValue}
              $hasError={error !== ""}
            />
            <ErrorMessage>{error}</ErrorMessage>

            <RadioGroup>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="number-system"
                  value={numericBaseType.DECIMAL}
                  checked={numericBase === numericBaseType.DECIMAL}
                  onChange={handleChange}
                />
                Decimal
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="number-system"
                  value={numericBaseType.BINARY}
                  checked={numericBase === numericBaseType.BINARY}
                  onChange={handleChange}
                />
                Binario
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="number-system"
                  value={numericBaseType.HEXA}
                  checked={numericBase === numericBaseType.HEXA}
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
