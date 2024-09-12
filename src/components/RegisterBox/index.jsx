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
import { toBinaryComplement } from "../../interpreter/utils.js";

export const RegisterBox = ({ id, data }) => {
  const registers = useSelector((state) => state.application.execute.registers);

  return (
    <>
      <MainContainer id={registersId}>
        <TitleContainer>
          <TitleText>Registros</TitleText>
        </TitleContainer>
        <RegistersContainer>
          {registers.map((value, i) => (
            <RegisterContainer key={i}>
              <RegisterNumeration>{i.toString(16)}</RegisterNumeration>
              <RegisterValue>
                {value != null ? toBinaryComplement(value) : "-"}
              </RegisterValue>
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
    </>
  );
};
