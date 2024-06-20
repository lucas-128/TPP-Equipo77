import React, { useMemo } from "react";
import { MainContainer, CustomHandle, RegisterContainer, TitleContainer, RegistersContainer } from "./styled.jsx";
import { Handle } from "reactflow";

export const RegisterBox = () => {

  const registerIds = useMemo(() => Array.from({ length: 16 }, (_, i) => `0x${(i + 1).toString(16).padStart(2, '0')}`), []);

  return <>
  <MainContainer>
    <TitleContainer>
      Registros
    </TitleContainer>
    <RegistersContainer>
    {registerIds.map((id) => (
      <RegisterContainer key={id}>
        {id}
      </RegisterContainer>
    ))}
    </RegistersContainer>
  </MainContainer>
  <CustomHandle type="source" position="bottom" id="3" style={{ background: "#555" }} />
  </>;
};
