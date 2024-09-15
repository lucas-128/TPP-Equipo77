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
  SignBit,
  ExponentBits,
  MantissaBits,
  BitsRow,
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
              {aluOperation && (
                <>
                  {aluOperation.operation === "Suma en punto flotante" ? (
                    <InfoContainer>
                      <RowOperation>
                        Operación
                        <OperationName>{aluOperation.operation}</OperationName>
                      </RowOperation>
                      <Row>
                        {"S: "}
                        <BitsRow>
                          <SignBit>{registerSbits.slice(0, 1)}</SignBit>
                          <ExponentBits>
                            {registerSbits.slice(1, 4)}
                          </ExponentBits>
                          <MantissaBits>{registerSbits.slice(4)}</MantissaBits>
                        </BitsRow>
                        {" → "}
                        <BitsRow>
                          {registerSbits.slice(0, 1) === "0" ? (
                            <SignBit>{"+"}</SignBit>
                          ) : (
                            <SignBit>{"-"}</SignBit>
                          )}
                          {"1."}
                          <MantissaBits>{registerSbits.slice(4)}</MantissaBits>
                          {"*2^"}
                          <ExponentBits>
                            {binaryToDecimalWithBias(registerSbits.slice(1, 4))}
                          </ExponentBits>
                        </BitsRow>
                      </Row>
                      <Row>
                        {"T: "}
                        <BitsRow>
                          <SignBit>{registerTbits.slice(0, 1)}</SignBit>
                          <ExponentBits>
                            {registerTbits.slice(1, 4)}
                          </ExponentBits>
                          <MantissaBits>{registerTbits.slice(4)}</MantissaBits>
                        </BitsRow>
                        {" → "}
                        <BitsRow>
                          {registerTbits.slice(0, 1) === "0" ? (
                            <SignBit>{"+"}</SignBit>
                          ) : (
                            <SignBit>{"-"}</SignBit>
                          )}
                          {"1."}
                          <MantissaBits>{registerTbits.slice(4)}</MantissaBits>
                          {"*2^"}
                          <ExponentBits>
                            {binaryToDecimalWithBias(registerTbits.slice(1, 4))}
                          </ExponentBits>
                        </BitsRow>
                      </Row>

                      {"Alineación de mantisas"}
                      <br />
                      {"0.10100 *2^3"}
                      <br />
                      {"1.01010 *2^3"}
                      <br />
                      <Line></Line>
                      {showResult ? (
                        <Row>
                          {"resultado sin normalizar -> "}

                          <span>{firstEightBits}</span>
                        </Row>
                      ) : (
                        <ButtonContainer>
                          <Button lightColor={true} onClick={handleShowResult}>
                            Realizar suma pf
                          </Button>
                        </ButtonContainer>
                      )}
                    </InfoContainer>
                  ) : aluOperation.operation === "Suma en complemento a 2" ? (
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
                            Realizar suma c2
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
