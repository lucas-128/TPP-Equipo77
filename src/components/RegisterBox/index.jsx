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

export const RegisterBox = ({ id, data }) => {
  const registers = useSelector((state) => state.application.registers);

  return (
    <>
      <MainContainer>
        <TitleContainer>
          <TitleText>Registros</TitleText>
        </TitleContainer>
        <RegistersContainer>
          {registers.map((value, i) => (
            <RegisterContainer key={i}>
              <RegisterNumeration>{i}</RegisterNumeration>
              <RegisterValue> {value}</RegisterValue>
            </RegisterContainer>
          ))}
        </RegistersContainer>
      </MainContainer>
      <CustomHandle
        type="source"
        position="bottom"
        style={{ background: "#555" }}
      />
    </>
  );
};
