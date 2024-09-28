import React, { useState } from "react";
import {
  CloseButton,
  Container,
  Content,
  Header,
  ModalBg,
  ModalBoxSetup,
  ModalWrapper,
  TextContainer,
  Title,
} from "./styled";
import { INTRODUCTION, tutorialTexts } from "./constants";
import { Button } from "../Button";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setShowTutorial, setTutorialStep } from "../../slices/modalsSlice";

export const Tutorial = ({ arrowPosition = "left" }) => {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.modals.tutorialStep);
  const showTutorial = useSelector((state) => state.modals.tutorial);

  const directionArrow = {
    left: { top: "50%", left: "-5px" },
    right: { top: "50%", left: "calc(100% - 10px)" },
    bottom: { top: "90%", left: "45%" },
    top: { top: "-5px", left: "40%" },
  };

  return (
    showTutorial && (
      <ModalWrapper>
        <ModalBoxSetup>
          <Container $direction={directionArrow[arrowPosition]}>
            <Content>
              <Header>
                <CloseButton onClick={() => dispatch(setShowTutorial(false))}>
                  {"Cerrar tutorial"}
                  <IoClose />{" "}
                </CloseButton>
              </Header>

              <Title>{tutorialTexts[step].title}</Title>
              <TextContainer>{tutorialTexts[step].content}</TextContainer>
              <div className="row">
                <Button
                  disabled={step === 0}
                  onClick={() => dispatch(setTutorialStep(step - 1))}
                >
                  {"Anterior"}
                </Button>
                <Button onClick={() => dispatch(setTutorialStep(step + 1))}>
                  {"Siguiente"}
                </Button>
              </div>
            </Content>
          </Container>
        </ModalBoxSetup>
        <ModalBg />
      </ModalWrapper>
    )
  );
};
