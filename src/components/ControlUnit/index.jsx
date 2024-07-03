import {
  BodyContainer,
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
    <MainContainer>
      <HeaderText>Unidad de Control</HeaderText>
      <BodyContainer>
        <SpecialRegisterContainer>
          <CustomText>Program Counter</CustomText>
          <SpecialRegisterValue> {programCounter} </SpecialRegisterValue>
        </SpecialRegisterContainer>
        <SpecialRegisterContainer>
          <CustomText>Instruction Register</CustomText>
          <SpecialRegisterValue> {instructionRegister} </SpecialRegisterValue>
        </SpecialRegisterContainer>
      </BodyContainer>
    </MainContainer>
  );
};
