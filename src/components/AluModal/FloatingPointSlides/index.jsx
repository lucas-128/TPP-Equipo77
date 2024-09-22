import React from "react";
import {
  InfoContainer,
  RowOperation,
  OperationName,
  SlidesContainer,
  Slide,
  Row,
  BitsRow,
  SignBit,
  ExponentBits,
  MantissaBits,
  SlidesButtonsContainer,
} from "./styled";
import { Button } from "../../Button";

import { IoArrowForward, IoArrowBack } from "react-icons/io5";

export const FloatingPointSlides = ({
  aluOperation,
  registerSbits,
  registerTbits,
  currentSlide,
  prevSlide,
  nextSlide,
}) => {
  const binaryToDecimalWithBias = (binaryStr) => {
    const decimalValue = parseInt(binaryStr, 2);
    const result = decimalValue - 3;
    return result;
  };

  return (
    <InfoContainer>
      <RowOperation>
        Operación
        <OperationName>{aluOperation.operation}</OperationName>
      </RowOperation>

      <SlidesContainer>
        {currentSlide === 0 && (
          <Slide>
            <Row>{"Interpretación de registros:"}</Row>
            <Row>
              {"S: "}
              {registerSbits}
              <IoArrowForward />
              <BitsRow>
                <SignBit>{registerSbits.slice(0, 1)}</SignBit>
                <ExponentBits>{registerSbits.slice(1, 4)}</ExponentBits>
                <MantissaBits>{registerSbits.slice(4)}</MantissaBits>
              </BitsRow>
            </Row>
            <Row>
              {"S: "}
              <BitsRow>
                <SignBit>
                  {registerSbits.slice(0, 1) === "0" ? "+" : "0"}
                </SignBit>
                {"1."}
                <MantissaBits>{registerSbits.slice(4)}</MantissaBits>
              </BitsRow>
              {"*2^"}
              <ExponentBits>
                {binaryToDecimalWithBias(registerSbits.slice(1, 4))}
              </ExponentBits>
            </Row>
            <br></br>
            <Row>
              {"T: "}
              {registerTbits}
              <IoArrowForward />
              <BitsRow>
                <SignBit>{registerTbits.slice(0, 1)}</SignBit>
                <ExponentBits>{registerTbits.slice(1, 4)}</ExponentBits>
                <MantissaBits>{registerTbits.slice(4)}</MantissaBits>
              </BitsRow>
            </Row>
            <Row>
              {"T: "}
              <BitsRow>
                <SignBit>
                  {registerTbits.slice(0, 1) === "0" ? "+" : "0"}
                </SignBit>
                {"1."}
                <MantissaBits>{registerTbits.slice(4)}</MantissaBits>
              </BitsRow>
              {"*2^"}
              <ExponentBits>
                {binaryToDecimalWithBias(registerTbits.slice(1, 4))}
              </ExponentBits>
            </Row>
          </Slide>
        )}
        {currentSlide === 1 && (
          <Slide>
            <Row>{"Alineación de mantisas:"}</Row>
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
  );
};
