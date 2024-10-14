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
  let binaryToDecimalWithBias = (binaryStr) => {
    const decimalValue = parseInt(binaryStr, 2);
    const result = decimalValue - 3;
    return result;
  };

  let parsedS = parseRegister(registerSbits);
  let parsedT = parseRegister(registerTbits);

  let alignedRegisters = alignMantissas(parsedS, parsedT);

  let sumResultMantissa = addBinary(
    alignedRegisters.register1.mantissa.implied,
    alignedRegisters.register2.mantissa.implied
  );

  let [normalizedMantissa, placesMoved] = normalizeMantissa(sumResultMantissa);

  let resultExponent = toBiasBinary(
    alignedRegisters.register1.exponent.decimal + placesMoved,
    3,
    3
  );

  const isUnderflow =
    alignedRegisters.register1.exponent.decimal + placesMoved < -3;
  const isOverflow =
    alignedRegisters.register1.exponent.decimal + placesMoved > 4;

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
                {alignedRegisters.register1.sign === 0 ? "+" : "-"}
                {alignedRegisters.register1.mantissa.implied}
              </BitsRow>
              {"*2^"}
              {alignedRegisters.register1.exponent.decimal}
            </Row>
            <Row>
              <BitsRow>
                {alignedRegisters.register2.sign === 0 ? "+" : "-"}
                {alignedRegisters.register2.mantissa.implied}
              </BitsRow>
              {"*2^"}
              {alignedRegisters.register2.exponent.decimal}
            </Row>
            <Line />
            <Row>
              <BitsRow>
                {"+"}
                {sumResultMantissa}
              </BitsRow>
              {"*2^"}
              {alignedRegisters.register2.exponent.decimal}
            </Row>
          </Slide>
        )}
        {currentSlide === 3 && (
          <Slide>
            <Row>{"Normalización y redondeo:"}</Row>
            <br></br>
            <Row>
              <BitsRow>
                {"+"}
                {sumResultMantissa}
              </BitsRow>
              {"*2^"}

              {alignedRegisters.register2.exponent.decimal}
            </Row>
            <IoArrowDown></IoArrowDown>
            <Row>
              <BitsRow>
                <SignBit>{"+"}</SignBit>
                {"1."}
                <MantissaBits>{normalizedMantissa.slice(2, 6)}</MantissaBits>
              </BitsRow>
              {"*2^"}
              <ExponentBits>
                {alignedRegisters.register2.exponent.decimal + placesMoved}
              </ExponentBits>
            </Row>
            {binaryToDecimalWithBias(resultExponent) + placesMoved < -3 ? (
              <span>Underflow exponente</span>
            ) : binaryToDecimalWithBias(resultExponent) + placesMoved > 4 ? (
              <span>Overflow exponente</span>
            ) : null}
          </Slide>
        )}
        {currentSlide === 4 && (
          <Slide>
            {isUnderflow ? (
              <Row>{"Underflow"}</Row>
            ) : isOverflow ? (
              <Row>{"Overflow"}</Row>
            ) : (
              <>
                <Row>{"Almacenamiento del resultado:"}</Row>
                <Row>
                  <BitsRow>
                    <SignBit>{"+"}</SignBit>
                    {"1."}
                    <MantissaBits>
                      {normalizedMantissa.slice(2, 6)}
                    </MantissaBits>
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
                    <MantissaBits>
                      {normalizedMantissa.slice(2, 6)}
                    </MantissaBits>
                  </BitsRow>
                  {"*2^ "}
                  <ExponentBits>{resultExponent}</ExponentBits>
                </Row>
                <IoArrowDown></IoArrowDown>
                <Row>
                  <BitsRow>
                    <SignBit>{0}</SignBit>
                    <ExponentBits>{resultExponent}</ExponentBits>
                    <MantissaBits>
                      {normalizedMantissa.slice(2, 6)}
                    </MantissaBits>
                  </BitsRow>
                </Row>
              </>
            )}
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
