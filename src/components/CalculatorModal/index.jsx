import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenCalculatorModal } from "../../slices/modalsSlice";
import {
  ModalContainer,
  ModalContent,
  Result,
  Title,
  Input,
  CloseButton,
} from "./styled";
import { Button } from "../Button";
import { IoClose } from "react-icons/io5";

const CalculatorModal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modals.calculatorModal);
  const closeModal = () => {
    setInputValue("");
    setResult("");
    setMode("hexToBin");
    dispatch(setOpenCalculatorModal(false));
  };

  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("hexToBin"); // Puede ser 'hexToBin' o 'binToHex'

  const isValidBinary = (value) => {
    if (!/^[01]+$/.test(value)) {
      setResult("Binario invalido.");
      return false;
    }
    return true;
  };

  const isValidHex = (value) => {
    if (!/^[0-9A-Fa-f]+$/.test(value)) {
      setResult("Hexadecimal invalido.");
      return false;
    }
    return true;
  };

  const convertValue = () => {
    if (inputValue) {
      if (mode === "hexToBin") {
        try {
          if (isValidHex(inputValue)) {
            let binary = parseInt(inputValue, 16).toString(2);
            if (binary.length > 20) {
              binary = binary.slice(0, 20) + "...";
            }
            setResult(binary);
          }
        } catch {
          setResult("Error");
        }
      } else {
        try {
          if (isValidBinary(inputValue)) {
            let hex = parseInt(inputValue, 2).toString(16).toUpperCase();
            if (hex.length > 20) {
              hex = hex.slice(0, 20) + "...";
            }
            setResult(hex);
          }
        } catch {
          setResult("Error");
        }
      }
    } else {
      setResult("");
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const toggleMode = () => {
    setMode(mode === "hexToBin" ? "binToHex" : "hexToBin");
    setInputValue("");
    setResult("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      convertValue();
    }
  };

  return (
    showModal && (
      <ModalContainer>
        <ModalContent>
          <CloseButton onClick={closeModal}>
            <IoClose />
          </CloseButton>
          <Title>Conversor de base numérica</Title>
          <Button onClick={toggleMode}>
            {mode === "hexToBin"
              ? "Hexadecimal a Binario"
              : "Binario a Hexadecimal"}
          </Button>
          <Input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={
              mode === "hexToBin"
                ? "Ingresar hexadecimal..."
                : "Ingresar binario..."
            }
          />
          <Button onClick={convertValue}>Convertir</Button>
          <Result>{result != "" ? result : "-"}</Result>
        </ModalContent>
      </ModalContainer>
    )
  );
};

export default CalculatorModal;
