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
  SlidesContainer,
  Slide,
  SlidesButtonsContainer,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { IoClose, IoArrowForward, IoArrowBack } from "react-icons/io5";
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

  const registerSbits = parseInt(aluOperation?.registerS ?? "0", 16)
    .toString(2)
    .padStart(8, "0")
    .slice(0, 8);

  const registerTbits = parseInt(aluOperation?.registerT ?? "0", 16)
    .toString(2)
    .padStart(8, "0")
    .slice(0, 8);

  const handleShowResult = () => {
    setShowResult(true);
  };

  const binaryToDecimalWithBias = (binaryStr) => {
    const decimalValue = parseInt(binaryStr, 2);
    const result = decimalValue - 3;
    return result;
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
                    <InfoContainer>
                      <RowOperation>
                        Operación
                        <OperationName>{aluOperation.operation}</OperationName>
                      </RowOperation>

                      <SlidesContainer>
                        {currentSlide === 0 && (
                          <Slide>
                            <Row>{"Interpretacion de registros"}</Row>
                            <Row>
                              {parseInt(aluOperation.registerS, 16)
                                .toString(2)
                                .padStart(8, "0")}
                            </Row>
                            <Row>
                              {parseInt(aluOperation.registerT, 16)
                                .toString(2)
                                .padStart(8, "0")}
                            </Row>
                          </Slide>
                        )}
                        {currentSlide === 1 && (
                          <Slide>
                            <Row>{"Alinear mantisas"}</Row>
                            <Row>
                              {parseInt(aluOperation.registerS, 16)
                                .toString(2)
                                .padStart(8, "0")}
                            </Row>
                            <Row>
                              {parseInt(aluOperation.registerT, 16)
                                .toString(2)
                                .padStart(8, "0")}
                            </Row>
                          </Slide>
                        )}
                        {currentSlide === 2 && (
                          <Slide>
                            <Row>{"Realizar Suma"}</Row>
                            <Row>
                              {parseInt(aluOperation.registerS, 16)
                                .toString(2)
                                .padStart(8, "0")}
                            </Row>
                            <Row>
                              {parseInt(aluOperation.registerT, 16)
                                .toString(2)
                                .padStart(8, "0")}
                            </Row>
                          </Slide>
                        )}
                        {currentSlide === 3 && (
                          <Slide>
                            <Row>{"Redondeo"}</Row>
                            <Row>
                              {parseInt(aluOperation.registerS, 16)
                                .toString(2)
                                .padStart(8, "0")}
                            </Row>
                            <Row>
                              {parseInt(aluOperation.registerT, 16)
                                .toString(2)
                                .padStart(8, "0")}
                            </Row>
                          </Slide>
                        )}
                        {currentSlide === 4 && (
                          <Slide>
                            <Row>{"Normalizar y binario"}</Row>
                            <Row>
                              {parseInt(aluOperation.registerS, 16)
                                .toString(2)
                                .padStart(8, "0")}
                            </Row>
                            <Row>
                              {parseInt(aluOperation.registerT, 16)
                                .toString(2)
                                .padStart(8, "0")}
                            </Row>
                          </Slide>
                        )}
                      </SlidesContainer>

                      <SlidesButtonsContainer>
                        {currentSlide != 0 && (
                          <Button lightColor={true} onClick={prevSlide}>
                            <IoArrowBack />
                          </Button>
                        )}
                        {currentSlide != 4 && (
                          <Button lightColor={true} onClick={nextSlide}>
                            <IoArrowForward />
                          </Button>
                        )}
                      </SlidesButtonsContainer>
                    </InfoContainer>
                  ) : (
                    <InfoContainer>
                      <RowOperation>
                        Operación
                        <OperationName>{aluOperation.operation}</OperationName>
                      </RowOperation>
                      <Row>
                        {parseInt(aluOperation.registerS, 16)
                          .toString(2)
                          .padStart(8, "0")}
                      </Row>
                      <Row>
                        {parseInt(aluOperation.registerT, 16)
                          .toString(2)
                          .padStart(8, "0")}
                      </Row>
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
