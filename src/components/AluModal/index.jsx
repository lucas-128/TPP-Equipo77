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
  Row,
  RowOperation,
} from "./styled";
import { FloatingPointSlides } from "./FloatingPointSlides";
import { useDispatch, useSelector } from "react-redux";
import { IoClose, IoArrowForward } from "react-icons/io5";
import { setOpenAluZoom } from "../../slices/modalsSlice";
import { Button } from "../Button";
import { toBinaryComplement } from "../../interpreter/utils.js";

export const AluModal = () => {
  const dispatch = useDispatch();
  const [showResult, setShowResult] = useState(false);
  const showModal = useSelector((state) => state.modals.aluZoom);
  const aluOperation = useSelector(
    (state) => state.application.execute.aluOperation
  );

  const result = (aluOperation?.result ?? 0).toString().padStart(8, "0");
  const firstEightBits = result.slice(0, 8);

  console.log(aluOperation);

  const registerSbits = toBinaryComplement(aluOperation?.registerS ?? "0");

  const registerTbits = toBinaryComplement(aluOperation?.registerT ?? "0");

  const handleShowResult = () => {
    setShowResult(true);
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  useEffect(() => {
    setShowResult(false);
    setCurrentSlide(0);
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
              {aluOperation && (
                <>
                  {aluOperation.operation === "Suma en punto flotante" ? (
                    <FloatingPointSlides
                      aluOperation={aluOperation}
                      registerSbits={registerSbits}
                      registerTbits={registerTbits}
                      currentSlide={currentSlide}
                      prevSlide={prevSlide}
                      nextSlide={nextSlide}
                    />
                  ) : aluOperation.operation === "Rotar a la derecha" ? (
                    <InfoContainer>
                      <RowOperation>
                        Operación
                        <OperationName>{aluOperation.operation}</OperationName>
                      </RowOperation>
                      <Row>{registerSbits}</Row>
                      <Row>Rotaciones: {parseInt(registerTbits, 2)}</Row>
                      <Line />
                      {showResult ? (
                        <Row>
                          <span>{firstEightBits}</span>
                        </Row>
                      ) : (
                        <ButtonContainer>
                          <Button lightColor={true} onClick={handleShowResult}>
                            Realizar operación
                          </Button>
                        </ButtonContainer>
                      )}
                    </InfoContainer>
                  ) : aluOperation.operation === "EQUAL" ? (
                    <InfoContainer>
                      <RowOperation>
                        Operación
                        <OperationName>{"Comparar Registros"}</OperationName>
                      </RowOperation>
                      <Row>{registerSbits}</Row>
                      <Row>{registerTbits}</Row>
                      <Line />
                      {showResult ? (
                        <Row>
                          {aluOperation?.result
                            ? "Registros iguales"
                            : "Registros diferentes"}
                        </Row>
                      ) : (
                        <ButtonContainer>
                          <Button lightColor={true} onClick={handleShowResult}>
                            Realizar operación
                          </Button>
                        </ButtonContainer>
                      )}
                    </InfoContainer>
                  ) : (
                    <InfoContainer>
                      <RowOperation>
                        Operación
                        <OperationName>{aluOperation.operation}</OperationName>
                      </RowOperation>
                      <Row>{registerSbits}</Row>
                      <Row>{registerTbits}</Row>
                      <Line />
                      {showResult ? (
                        <Row>
                          <span>{firstEightBits}</span>
                        </Row>
                      ) : (
                        <ButtonContainer>
                          <Button lightColor={true} onClick={handleShowResult}>
                            Realizar operación
                          </Button>
                        </ButtonContainer>
                      )}
                    </InfoContainer>
                  )}
                </>
              )}
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
