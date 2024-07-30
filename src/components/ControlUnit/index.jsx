import { controlUnitId } from "../../containers/SimulatorSection/components";
import { useEffect } from "react";
import {
  BodyContainer,
  CustomHandle,
  CustomText,
  HeaderText,
  MainContainer,
  SpecialRegisterContainer,
  SpecialRegisterValue,
} from "./styled";
import { useSelector } from "react-redux";

export const ControlUnit = () => {
  const programCounter = useSelector(
    (state) => state.application.programCounter
  );

  const instructionRegister = useSelector(
    (state) => state.application.instructionRegister
  );

  return (
    <MainContainer id={controlUnitId}>
      <HeaderText>Unidad de Control</HeaderText>
      <BodyContainer>
        <SpecialRegisterContainer>
          <CustomText>Contador de programa</CustomText>
          <SpecialRegisterValue id="PC">{programCounter}</SpecialRegisterValue>
        </SpecialRegisterContainer>
        <SpecialRegisterContainer>
          <CustomText>Registro de instrucción</CustomText>
          <SpecialRegisterValue id="IR">
            {instructionRegister}
          </SpecialRegisterValue>
        </SpecialRegisterContainer>
      </BodyContainer>
      {/* main memory to control unit*/}
      <CustomHandle type="target" position="right" />
      {/* main memory to control unit*/}
      <CustomHandle type="source" position="bottom" />
      {/* main memory to control unit*/}
      <CustomHandle type="source" position="right" />
      {/* cache to control unit */}
      <CustomHandle type="target" position="bottom" />
    </MainContainer>
  );
};
