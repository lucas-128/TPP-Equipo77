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
import { useEffect, useState } from "react";
import { getInstructionLog } from "../../interpreter/instruction_descriptor";
import { InstructionFactory } from "../../interpreter/InstructionFactory";

export const ControlUnitModal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modals.controlUnitZoom);
  const mainMemmoryCells = useSelector(
    (state) => state.application.execute.mainMemoryCells
  );
  const decodeId = useSelector(
    (state) => state.application.decode.instructionId
  );

  const [instruction, setInstruction] = useState("");
  const [instructionDescription, setInstructionDescription] = useState("");

  useEffect(() => {
    if (mainMemmoryCells && decodeId !== null) {
      const instructionIndex = parseInt(decodeId);
      const firstHalfIndex = instructionIndex + instructionIndex * 1;
      const secondHalfIndex = instructionIndex + 1 + instructionIndex * 1;
      const firstHalf = mainMemmoryCells[firstHalfIndex];
      const secondHalf = mainMemmoryCells[secondHalfIndex];
      const instructionStr = firstHalf.toString() + secondHalf.toString();
      setInstruction(instructionStr.toUpperCase());
      const instructionDesc = getInstructionLog(
        instructionStr[0],
        instructionStr
      );
      setInstructionDescription(instructionDesc);
    }
  }, [mainMemmoryCells, decodeId]);

  return (
    showModal && (
      <ModalWrapper>
        <ModalBoxSetup>
          <ModalContainer>
            <InfoContainer>
              <InfoTile>{"Unidad de control"}</InfoTile>
              <Info>{"• Instrucción: " + instruction}</Info>
              <Info>{"• Descripción: " + instructionDescription}</Info>
              <Info>{"• Información adicional: "}</Info>
              {InstructionFactory.createInstruction(instruction, 0)
                .toString()
                .map((instructionData, i) => {
                  return <Info key={i}>{instructionData}</Info>;
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
