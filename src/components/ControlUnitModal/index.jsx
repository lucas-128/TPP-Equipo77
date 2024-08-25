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
  const fetchId = useSelector((state) => state.application.fetch.instructionId);
  const instructionRegister = useSelector(
    (state) => state.application.fetch.instructionRegister
  );
  const programCounter = useSelector(
    (state) => state.application.fetch.programCounter
  );

  const controlUnitInfo = useMemo(() => {
    return {
      instruction: instructionRegister ? instructionRegister.toUpperCase() : "",
      instructionDescription: instructionRegister
        ? getInstructionLog(instructionRegister[0], instructionRegister)
        : "",
      programCounter: programCounter
        ? programCounter.toString(16).padStart(2, "0")
        : "",
    };
  }, [fetchId, instructionRegister, programCounter]);

  return (
    showModal && (
      <ModalWrapper>
        <ModalBoxSetup>
          <ModalContainer>
            <InfoContainer>
              <InfoTile>{"Unidad de control"}</InfoTile>
              <Info>
                {"• Contador de programa: " + controlUnitInfo.programCounter}
              </Info>
              <Info>{"• Instrucción: " + controlUnitInfo.instruction}</Info>
              <Info>
                {"• Descripción: " + controlUnitInfo.instructionDescription}
              </Info>
              <InfoTile>{"Información adicional"}</InfoTile>
              {InstructionFactory.createInstruction(
                controlUnitInfo.instruction,
                0
              )
                .toString()
                .map((instructionData, i) => {
                  return <Info key={i}>{"• " + instructionData}</Info>;
                })}
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
