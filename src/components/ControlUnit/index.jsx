import { controlUnitId } from "../../containers/SimulatorSection/components";
import { useEffect, useState } from "react";
import {
  BodyContainer,
  CustomHandle,
  CustomText,
  HeaderText,
  IndicatorText,
  MainContainer,
  SpecialRegisterContainer,
  SpecialRegisterValue,
} from "./styled";
import { useSelector } from "react-redux";

export const ControlUnit = () => {
  const programCounter = useSelector(
    (state) => state.application.fetch.programCounter
  );

  const instructionRegister = useSelector(
    (state) => state.application.fetch.instructionRegister
  );

  // const fetchId = useSelector((state) => state.application.fetch.instructionId);
  const decodeId = useSelector(
    (state) => state.application.decode.instructionId
  );

  // TODO: en que ciclo de ejecucion estamos? Fetch, decode, execute.
  // const status = useSelector() ....
  let statusText = "Decodificando Instrucción"; //Decodificando Instrucción -  Ejecutando Instrucción
  const [shouldAnimateText, setShouldAnimateText] = useState(decodeId != null);

  return (
    <MainContainer id={controlUnitId}>
      <HeaderText>Unidad de Control</HeaderText>
      <BodyContainer>
        <SpecialRegisterContainer>
          <CustomText>Contador de programa</CustomText>
          <SpecialRegisterValue id="PC">
            {programCounter !== null
              ? programCounter.toString(16).padStart(2, "0")
              : " - "}
          </SpecialRegisterValue>
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
      <IndicatorText animate={shouldAnimateText}>
        {decodeId !== null ? statusText : ""}
      </IndicatorText>
    </MainContainer>
  );
};
