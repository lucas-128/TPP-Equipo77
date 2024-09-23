import {
  ControlUnitContainer,
  Bus,
  StartBusContainer,
  CloseButton,
  ModalBg,
  ModalBoxSetup,
  ModalContainer,
  ModalWrapper,
  EndBusContainer,
  AddrBus,
  DataBus,
  InfoContainer,
  Info,
  InfoTile,
  InfoBox,
  DataBox,
  BlankDataBox,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { setOpenControlUnitZoom } from "../../slices/modalsSlice";
import { getInstructionLog } from "../../interpreter/instruction_descriptor";
import { InstructionFactory } from "../../interpreter/InstructionFactory";
import { useMemo } from "react";

export const ControlUnitModal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modals.controlUnitZoom);
  const decodeId = useSelector((state) => state.application.decode.instructionId);
  const instructionRegister = useSelector(
    (state) => state.application.decode.instructionRegister
  );
  const programCounter = useSelector(
    (state) => state.application.decode.programCounter
  );

  const controlUnitInfo = useMemo(() => {
    return {
      instruction: instructionRegister ? instructionRegister.toUpperCase() : "",
      instructionDescription: instructionRegister
        ? getInstructionLog(instructionRegister[0], instructionRegister)
        : "",
      programCounter: programCounter
        ? programCounter.toString(16).padStart(2, "0").toUpperCase()
        : "",
    };
  }, [decodeId, instructionRegister, programCounter]);

  return (
    showModal && (
      <ModalWrapper>
        <ModalBoxSetup>
          <ModalContainer>
            <InfoContainer>
              <InfoTile>{"Unidad de control"}</InfoTile>

              <InfoBox>
                <Info>
                  <BlankDataBox>{"Contador de programa:"}</BlankDataBox>
                  <DataBox>{controlUnitInfo.programCounter}</DataBox>
                </Info>
                <Info>
                  <BlankDataBox>{"Instrucción:"}</BlankDataBox>
                  <DataBox>{controlUnitInfo.instruction}</DataBox>
                </Info>
                <Info>
                  <BlankDataBox>
                    {controlUnitInfo.instructionDescription}
                  </BlankDataBox>
                </Info>
              </InfoBox>

              <InfoTile>{"Información adicional"}</InfoTile>
              <InfoBox>
                {InstructionFactory.createInstruction(
                  controlUnitInfo.instruction,
                  0
                )
                  ?.toString()
                  .map((instructionData, i) => {
                    return (
                      <Info key={i}>
                        <BlankDataBox key={i}>
                          {instructionData[0]}
                        </BlankDataBox>
                        <DataBox key={i}>{instructionData[1]}</DataBox>
                      </Info>
                    );
                  })}
              </InfoBox>
            </InfoContainer>
            <StartBusContainer>
              <Bus>Bus hacia los registros</Bus>
            </StartBusContainer>
            <ControlUnitContainer>
              <InfoContainer></InfoContainer>
            </ControlUnitContainer>
            <EndBusContainer>
              <DataBus>Bus de datos</DataBus>
              <AddrBus>Bus de direcciones</AddrBus>
            </EndBusContainer>
          </ModalContainer>
          <CloseButton onClick={() => dispatch(setOpenControlUnitZoom(false))}>
            Cerrar
            <IoClose />
          </CloseButton>
        </ModalBoxSetup>
        <ModalBg />
      </ModalWrapper>
    )
  );
};
