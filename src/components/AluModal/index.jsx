import React, { useEffect, useState } from "react";
import {
  AluContainer,
  Bus,
  StartBusContainer,
  CloseButton,
  InfoContainer,
  ModalBg,
  ModalBoxSetup,
  ModalContainer,
  ModalWrapper,
  EndBusContainer,
  OperationName,
  Line,
  CircledNumber,
  ButtonContainer,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { setOpenAluZoom } from "../../slices/modalsSlice";
import { Button } from "../Button";

export const AluModal = () => {
  const dispatch = useDispatch();
  const [showResult, setShowResult] = useState(false);
  const showModal = useSelector((state) => state.modals.aluZoom);
  const aluOperation = useSelector((state) => state.application.execute.aluOperation);

  useEffect(() => {
    setShowResult(false);
  }, [showModal]);

  return (
    showModal && (
      <ModalWrapper>
        <ModalBoxSetup>
          <ModalContainer>
            <StartBusContainer>
              <Bus>
                Registro S:
                <CircledNumber>{aluOperation.registerSIndex}</CircledNumber>
              </Bus>
              <Bus>
                Registro T:
                <CircledNumber>{aluOperation.registerTIndex}</CircledNumber>
              </Bus>
            </StartBusContainer>
            <AluContainer>
              <InfoContainer>
                <div className="row" style={{ marginBottom: "20px" }}>
                  Operación
                  <OperationName>{aluOperation.operation}</OperationName>
                </div>
                <div className="row">
                  {aluOperation.registerS.toString(2).padStart(8, "0")}
                </div>
                <div className="row">
                  {aluOperation.registerT.toString(2).padStart(8, "0")}
                </div>
                <Line />
                {showResult ? (
                  <div className="row">
                    {aluOperation.result.toString(2).padStart(8, "0")}
                  </div>
                ) : (
                  <ButtonContainer>
                    <Button
                      lightColor={true}
                      onClick={() => setShowResult(true)}
                    >
                      Realizar operación
                    </Button>
                  </ButtonContainer>
                )}
              </InfoContainer>
            </AluContainer>
            <EndBusContainer>
              <Bus>
                Registro R (destino):
                <CircledNumber>{aluOperation.destinationIndex}</CircledNumber>
              </Bus>
            </EndBusContainer>
          </ModalContainer>
          <CloseButton onClick={() => dispatch(setOpenAluZoom(false))}>
            Cerrar
            <IoClose />
          </CloseButton>
        </ModalBoxSetup>
        <ModalBg />
      </ModalWrapper>
    )
  );
};
