import React, { useState } from "react";
import {
  InfoContainer,
  OperationName,
  ButtonContainer,
  Row,
  RowOperation,
} from "../styled";
import {
  Line,
  Slide,
  SlidesContainer,
  OperationDescription,
  SlidesButtonsContainer,
} from "./styled";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";

import { Button } from "../../Button";
import { instructions } from "../../../interpreter/instruction_descriptor";

const initialSlide = 0;
const lastSlide = 2;

const operationCodeMapByName = {
  "Suma en complemento a 2": "5",
  "Suma en punto flotante": "6",
  OR: "7",
  AND: "8",
  XOR: "9",
  "Rotar a la derecha": "A",
  EQUAL: "B",
};

const OperationInfo = ({
  aluOperationName,
  registerSbits,
  registerTbits,
  firstEightBits,
  showResult,
  result,
  handleShowResult,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  const aluOpCode = operationCodeMapByName[aluOperationName];
  const aluOpDesc = instructions[aluOpCode][0];

  return (
    <InfoContainer>
      <RowOperation>
        Operación
        <OperationName>
          {aluOperationName === "EQUAL"
            ? "Comparar registros"
            : aluOperationName}
        </OperationName>
      </RowOperation>
      <SlidesContainer>
        <Slide>
          {currentSlide == 0 && (
            <>
              {"Descripción:"}
              <OperationDescription>{aluOpDesc}</OperationDescription>
            </>
          )}
        </Slide>
        <Slide>
          {currentSlide == 1 && (
            <div>
              Tabla lógica de la operación
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="row"
              >
                <div>X</div>
                <div>Y</div>
                <div>Z</div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="row"
              >
                <div>0</div>
                <div>0</div>
                <div>0</div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="row"
              >
                <div>0</div>
                <div>1</div>
                <div>1</div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="row"
              >
                <div>1</div>
                <div>0</div>
                <div>1</div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="row"
              >
                <div>1</div>
                <div>1</div>
                <div>0</div>
              </div>
            </div>
          )}
        </Slide>
        <Slide>
          {currentSlide == 2 && (
            <>
              {aluOperationName === "Rotar a la derecha" ? (
                <>
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
                </>
              ) : aluOperationName === "EQUAL" ? (
                <>
                  <Row>{registerSbits}</Row>
                  <Row>{registerTbits}</Row>
                  <Line />
                  {showResult ? (
                    <Row>
                      {result ? "Registros iguales" : "Registros diferentes"}
                    </Row>
                  ) : (
                    <ButtonContainer>
                      <Button lightColor={true} onClick={handleShowResult}>
                        Realizar operación
                      </Button>
                    </ButtonContainer>
                  )}
                </>
              ) : (
                <>
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
                </>
              )}
            </>
          )}
        </Slide>
      </SlidesContainer>

      <SlidesButtonsContainer>
        {currentSlide != initialSlide && (
          <Button lightColor={true} onClick={prevSlide}>
            <IoArrowBack />
          </Button>
        )}
        {currentSlide != lastSlide && (
          <Button lightColor={true} onClick={nextSlide}>
            <IoArrowForward />
          </Button>
        )}
      </SlidesButtonsContainer>
    </InfoContainer>
  );
};

export default OperationInfo;
