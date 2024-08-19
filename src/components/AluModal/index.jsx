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
  ExtraBits,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { setOpenAluZoom } from "../../slices/modalsSlice";
import { Button } from "../Button";

export const AluModal = () => {
  const dispatch = useDispatch();
  const [showResult, setShowResult] = useState(false);
  const showModal = useSelector((state) => state.modals.aluZoom);
  const aluOperation = useSelector(
    (state) => state.application.execute.aluOperation
  );

  const result = (aluOperation?.result ?? 0).toString().padStart(8, "0");
  const firstEightBits = result.slice(0, 8);
  const extraBits = result.slice(8);

  const handleShowResult = () => {
    setShowResult(true);
  };

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
                  {parseInt(aluOperation.registerS, 16)
                    .toString(2)
                    .padStart(8, "0")}
                </div>
                <div className="row">
                  {parseInt(aluOperation.registerT, 16)
                    .toString(2)
                    .padStart(8, "0")}
                </div>
                <Line />
                {showResult ? (
                  <div className="row" style={{ display: "flex", gap: "0" }}>
                    <span>{firstEightBits}</span>
                    {extraBits && <ExtraBits>{extraBits}</ExtraBits>}
                  </div>
                ) : (
                  <ButtonContainer>
                    <Button lightColor={true} onClick={handleShowResult}>
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
