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
import { useDispatch, useSelector } from "react-redux";
import { setOpenControlUnitZoom } from "../../slices/modalsSlice";

export const ControlUnit = () => {
  const dispatch = useDispatch();
  const programCounter = useSelector(
    (state) => state.application.fetch.programCounter
  );

  const instructionRegister = useSelector(
    (state) => state.application.fetch.instructionRegister
  );

  const fetchId = useSelector((state) => state.application.fetch.instructionId);
  const decodeId = useSelector(
    (state) => state.application.decode.instructionId
  );
  const executeId = useSelector(
    (state) => state.application.execute.instructionId
  );

  const texts = {
    fetch: "Buscando instrucción",
    decode: "Decodificando instrucción",
    execute: "Ejecutando instrucción",
  };

  return (
    <MainContainer
      id={controlUnitId}
      $operating={decodeId !== null}
      onClick={() => dispatch(setOpenControlUnitZoom(true))}
    >
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
      <IndicatorText animate={false}>
        {/* TODO: si el tipo de ejecución es simple esto no se muestra */}
        {decodeId !== null ? texts.decode : ""}
        {fetchId !== null ? texts.fetch : ""}
        {executeId !== null ? texts.execute : ""}
      </IndicatorText>
    </MainContainer>
  );
};
