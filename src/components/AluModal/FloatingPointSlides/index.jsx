import React from "react";
import {
  InfoContainer,
  RowOperation,
  OperationName,
  SlidesContainer,
  Slide,
  Row,
  Line,
  BitsRow,
  SignBit,
  ExponentBits,
  MantissaBits,
  SlidesButtonsContainer,
  Ball,
  InfoRow,
  InitialSignBit,
  InitialMantissaBits,
  InitialExponentBits,
} from "./styled";
import { Button } from "../../Button";
import {
  alignMantissas,
  parseRegister,
  addBinary,
  normalizeMantissa,
  toBiasBinary,
} from "../../../interpreter/instructions/FloatingPointSum";

import { IoArrowForward, IoArrowBack, IoArrowDown } from "react-icons/io5";

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

  const parsedS = parseRegister(registerSbits);
  const parsedT = parseRegister(registerTbits);

  const alignedRegisters = alignMantissas(parsedS, parsedT);

  const sumResultMantissa = addBinary(
    alignedRegisters.register1.mantissa.implied,
    alignedRegisters.register2.mantissa.implied
  );

  const [normalizedMantissa, placesMoved] =
    normalizeMantissa(sumResultMantissa);

  const resultExponent = toBiasBinary(
    alignedRegisters.register1.exponent.decimal + placesMoved,
    3,
    3
  );

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
            <InfoRow>
              <Ball style={{ backgroundColor: "lightgreen" }} />
              <span> Signo |</span>
              <Ball style={{ backgroundColor: "teal" }} />
              <span> Exponente |</span>
              <Ball style={{ backgroundColor: "lightblue" }} />
              <span> Mantisa </span>
            </InfoRow>
            <Row>
              {"S: "}
              {registerSbits}
              <IoArrowForward />
              <BitsRow>
                <InitialSignBit>{registerSbits.slice(0, 1)}</InitialSignBit>
                <InitialExponentBits>
                  {registerSbits.slice(1, 4)}
                </InitialExponentBits>
                <InitialMantissaBits>
                  {registerSbits.slice(4)}
                </InitialMantissaBits>
              </BitsRow>
            </Row>
            <Row>
              {"S ="}
              <BitsRow>
                <SignBit>
                  {registerSbits.slice(0, 1) === "0" ? "+" : "-"}
                </SignBit>
                {"1."}
                <MantissaBits>{registerSbits.slice(4)}</MantissaBits>
              </BitsRow>
              {"*2^"}
              <ExponentBits>
                {binaryToDecimalWithBias(registerSbits.slice(1, 4))}
              </ExponentBits>
            </Row>
            <Line />

            <Row>
              {"T: "}
              {registerTbits}
              <IoArrowForward />
              <BitsRow>
                <InitialSignBit>{registerTbits.slice(0, 1)}</InitialSignBit>
                <InitialExponentBits>
                  {registerTbits.slice(1, 4)}
                </InitialExponentBits>
                <InitialMantissaBits>
                  {registerTbits.slice(4)}
                </InitialMantissaBits>
              </BitsRow>
            </Row>
            <Row>
              {"T ="}
              <BitsRow>
                <SignBit>
                  {registerTbits.slice(0, 1) === "0" ? "+" : "-"}
                </SignBit>
                {"1."}
                <MantissaBits>{registerTbits.slice(4)}</MantissaBits>
              </BitsRow>
              {"*2^"}
              <InitialExponentBits>
                {binaryToDecimalWithBias(registerTbits.slice(1, 4))}
              </InitialExponentBits>
            </Row>
          </Slide>
        )}
        {currentSlide === 1 && (
          <Slide>
            <Row>{"Alineación de mantisas:"}</Row>

            <Row>
              {"S: "}
              <BitsRow>
                <SignBit>
                  {registerSbits.slice(0, 1) === "0" ? "+" : "-"}
                </SignBit>
                {"1."}
                <MantissaBits>{registerSbits.slice(4)}</MantissaBits>
              </BitsRow>
              {"*2^"}
              <ExponentBits>
                {binaryToDecimalWithBias(registerSbits.slice(1, 4))}
              </ExponentBits>
            </Row>

            <Row>
              {"T: "}
              <BitsRow>
                <SignBit>
                  {registerTbits.slice(0, 1) === "0" ? "+" : "-"}
                </SignBit>
                {"1."}
                <MantissaBits>{registerTbits.slice(4)}</MantissaBits>
              </BitsRow>
              {"*2^"}
              <ExponentBits>
                {binaryToDecimalWithBias(registerTbits.slice(1, 4))}
              </ExponentBits>
            </Row>

            <IoArrowDown></IoArrowDown>

            {binaryToDecimalWithBias(registerTbits.slice(1, 4)) ===
            binaryToDecimalWithBias(registerSbits.slice(1, 4)) ? (
              <Row>{"Las mantisas ya están alineadas."}</Row>
            ) : parseInt(
                binaryToDecimalWithBias(registerTbits.slice(1, 4)),
                10
              ) >
              parseInt(
                binaryToDecimalWithBias(registerSbits.slice(1, 4)),
                10
              ) ? (
              <Slide>
                <Row>
                  {"S: "}
                  <BitsRow>
                    <SignBit>
                      {alignedRegisters.register2.sign === 0 ? "+" : "-"}
                    </SignBit>
                    <MantissaBits>
                      {alignedRegisters.register2.mantissa.implied}
                    </MantissaBits>
                  </BitsRow>
                  {"*2^"}
                  <ExponentBits>
                    {alignedRegisters.register2.exponent.decimal}
                  </ExponentBits>
                </Row>
                <Row>
                  {"T: "}
                  <BitsRow>
                    <SignBit>
                      {alignedRegisters.register1.sign === 0 ? "+" : "-"}
                    </SignBit>
                    <MantissaBits>
                      {alignedRegisters.register1.mantissa.implied}
                    </MantissaBits>
                  </BitsRow>
                  {"*2^"}
                  <ExponentBits>
                    {alignedRegisters.register1.exponent.decimal}
                  </ExponentBits>
                </Row>
              </Slide>
            ) : (
              <Slide>
                <Row>
                  {"S: "}
                  <BitsRow>
                    <SignBit>
                      {alignedRegisters.register1.sign === 0 ? "+" : "-"}
                    </SignBit>
                    <MantissaBits>
                      {alignedRegisters.register1.mantissa.implied}
                    </MantissaBits>
                  </BitsRow>
                  {"*2^"}
                  <ExponentBits>
                    {alignedRegisters.register1.exponent.decimal}
                  </ExponentBits>
                </Row>
                <Row>
                  {"T: "}
                  <BitsRow>
                    <SignBit>
                      {alignedRegisters.register2.sign === 0 ? "+" : "-"}
                    </SignBit>
                    <MantissaBits>
                      {alignedRegisters.register2.mantissa.implied}
                    </MantissaBits>
                  </BitsRow>
                  {"*2^"}
                  <ExponentBits>
                    {alignedRegisters.register2.exponent.decimal}
                  </ExponentBits>
                </Row>
              </Slide>
            )}
          </Slide>
        )}
        {currentSlide === 2 && (
          <Slide>
            <Row>{"Suma:"}</Row>
            <br></br>
            <Row>
              <BitsRow>
                <SignBit>
                  {alignedRegisters.register1.sign === 0 ? "+" : "-"}
                </SignBit>
                <MantissaBits>
                  {alignedRegisters.register1.mantissa.implied}
                </MantissaBits>
              </BitsRow>
              {"*2^"}
              <ExponentBits>
                {alignedRegisters.register1.exponent.decimal}
              </ExponentBits>
            </Row>
            <Row>
              <BitsRow>
                <SignBit>
                  {alignedRegisters.register2.sign === 0 ? "+" : "-"}
                </SignBit>
                <MantissaBits>
                  {alignedRegisters.register2.mantissa.implied}
                </MantissaBits>
              </BitsRow>
              {"*2^"}
              <ExponentBits>
                {alignedRegisters.register2.exponent.decimal}
              </ExponentBits>
            </Row>
            <Line />
            <Row>
              <BitsRow>
                <SignBit>{"+"}</SignBit>
                <MantissaBits>{sumResultMantissa}</MantissaBits>
              </BitsRow>
              {"*2^ "}
              <ExponentBits>
                {alignedRegisters.register2.exponent.decimal}
              </ExponentBits>
            </Row>
          </Slide>
        )}
        {currentSlide === 3 && (
          <Slide>
            <Row>{"Normalización y redondeo:"}</Row>
            <br></br>
            <Row>
              <BitsRow>
                <SignBit>{"+"}</SignBit>
                <MantissaBits>{sumResultMantissa}</MantissaBits>
              </BitsRow>
              {"*2^ "}
              <ExponentBits>
                {alignedRegisters.register2.exponent.decimal}
              </ExponentBits>
            </Row>
            <IoArrowDown></IoArrowDown>
            <Row>
              <BitsRow>
                <SignBit>{"+"}</SignBit>
                {"1."}
                <MantissaBits>{normalizedMantissa.slice(2, 6)}</MantissaBits>
              </BitsRow>
              {"*2^ "}
              <ExponentBits>
                {binaryToDecimalWithBias(resultExponent)}
              </ExponentBits>
            </Row>
          </Slide>
        )}
        {currentSlide === 4 && (
          <Slide>
            <Row>{"Almacenamiento del resultado:"}</Row>
            <Row>
              <BitsRow>
                <SignBit>{"+"}</SignBit>
                {"1."}
                <MantissaBits>{normalizedMantissa.slice(2, 6)}</MantissaBits>
              </BitsRow>
              {"*2^ "}
              <ExponentBits>
                {binaryToDecimalWithBias(resultExponent)}
              </ExponentBits>
            </Row>
            <IoArrowDown></IoArrowDown>
            <Row>
              <BitsRow>
                <SignBit>{"+"}</SignBit>
                {"1."}
                <MantissaBits>{normalizedMantissa.slice(2, 6)}</MantissaBits>
              </BitsRow>
              {"*2^ "}
              <ExponentBits>{resultExponent}</ExponentBits>
            </Row>
            <IoArrowDown></IoArrowDown>
            <Row>
              <BitsRow>
                <SignBit>{0}</SignBit>
                <ExponentBits>{resultExponent}</ExponentBits>
                <MantissaBits>{normalizedMantissa.slice(2, 6)}</MantissaBits>
              </BitsRow>
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
