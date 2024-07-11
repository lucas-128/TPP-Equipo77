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
      <CustomHandle
        type="target"
        position="bottom"
        style={{ background: "#555" }}
      />
    </>
  );
};
