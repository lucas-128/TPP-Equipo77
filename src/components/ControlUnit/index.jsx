import {
  BodyContainer,
  CustomText,
  HeaderText,
  MainContainer,
  SpecialRegisterContainer,
  SpecialRegisterValue,
} from "./styled";

export const ControlUnit = () => {
  return (
    <MainContainer>
      <HeaderText>Unidad de Control</HeaderText>
      <BodyContainer>
        <SpecialRegisterContainer>
          <CustomText>Program Counter</CustomText>
          <SpecialRegisterValue> - </SpecialRegisterValue>
        </SpecialRegisterContainer>
        <SpecialRegisterContainer>
          <CustomText>Instruction Register</CustomText>
          <SpecialRegisterValue> - </SpecialRegisterValue>
        </SpecialRegisterContainer>
      </BodyContainer>
    </MainContainer>
  );
};
