import React, { useMemo } from "react";
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

export const RegisterBox = () => {
  const registerIds = useMemo(
    () =>
      Array.from(
        { length: 16 },
        (_, i) => `${i.toString(16).padStart(2, "0").toUpperCase()}`
      ),
    []
  );

  return (
    <>
      <MainContainer>
        <TitleContainer>
          <TitleText>Registros</TitleText>
        </TitleContainer>
        <RegistersContainer>
          {registerIds.map((id) => (
            <RegisterContainer key={id}>
              <RegisterNumeration>{id}</RegisterNumeration>
              <RegisterValue> -</RegisterValue>
            </RegisterContainer>
          ))}
        </RegistersContainer>
      </MainContainer>
      <CustomHandle
        type="source"
        position="bottom"
        id="3"
        style={{ background: "#555" }}
      />
    </>
  );
};
