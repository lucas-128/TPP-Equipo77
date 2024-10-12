import React, { useEffect, useMemo, useState } from "react";
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
import { tutorialTexts } from "./constants.jsx";
import { Button } from "../Button";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setShowTutorial, setTutorialStep } from "../../slices/modalsSlice";

export const Tutorial = () => {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.modals.tutorialStep);
  const showTutorial = useSelector((state) => state.modals.tutorial);
  const [lastHighlightedElement, setLastHighlighted] = useState(null);

  const directionArrow = {
    left: { top: "50%", left: "-5px" },
    right: { top: "50%", left: "calc(100% - 15px)" },
    bottom: { top: "90%", left: "45%" },
    top: { top: "-5px", left: "50%" },
    none: { hide: true },
  };

  const tutorialStep = useMemo(() => {
    return tutorialTexts[step];
  }, [step]);

  useEffect(() => {
    if (showTutorial) {
      if (!!lastHighlightedElement) {
        lastHighlightedElement.style.zIndex = 0;
      }
      const elementToHighlight = document.getElementById(
        tutorialStep.highlight
      );
      if (!!elementToHighlight) {
        elementToHighlight.style.zIndex = 5;
        setLastHighlighted(elementToHighlight);
      }
    }
  }, [showTutorial, step]);

  return (
    showTutorial && (
      <ModalWrapper>
        <ModalBoxSetup $position={tutorialStep.position}>
          <Container
            $direction={directionArrow[tutorialStep.arrow]}
            $width={tutorialStep.position.maxWidth}
          >
            <Content>
              <Header>
                <CloseButton onClick={() => dispatch(setShowTutorial(false))}>
                  {"Cerrar tutorial"}
                  <IoClose />{" "}
                </CloseButton>
              </Header>
              <Title>{tutorialStep.title}</Title>
              <TextContainer>{tutorialStep.content}</TextContainer>
              <div className="row">
                <Button
                  disabled={step === 0}
                  onClick={() => dispatch(setTutorialStep(step - 1))}
                >
                  {"Anterior"}
                </Button>

                {step === 0 ? (
                  <Button onClick={() => dispatch(setTutorialStep(step + 1))}>
                    {"Empezar"}
                  </Button>
                ) : step === Object.keys(tutorialTexts).length - 1 ? (
                  <>
                    <Button onClick={() => dispatch(setShowTutorial(false))}>
                      {"Finalizar"}
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => dispatch(setTutorialStep(step + 1))}>
                    {"Siguiente"}
                  </Button>
                )}
              </div>
            </Content>
          </Container>
        </ModalBoxSetup>
        <ModalBg />
      </ModalWrapper>
    )
  );
};
