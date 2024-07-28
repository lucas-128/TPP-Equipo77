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
          <SpecialRegisterValue id="PC">
            {programCounter !== null ? programCounter.toString(16).padStart(2, "0") : " - "}
          </SpecialRegisterValue>
        </SpecialRegisterContainer>
        <SpecialRegisterContainer>
          <CustomText>Registro de instrucción</CustomText>
          <SpecialRegisterValue id="IR">
            {instructionRegister}
          </SpecialRegisterValue>
        </SpecialRegisterContainer>
      </BodyContainer>
      <CustomHandle type="target" position="right" />
      <CustomHandle type="source" position="bottom" />
      <CustomHandle type="source" position="right" />
    </MainContainer>
  );
};
