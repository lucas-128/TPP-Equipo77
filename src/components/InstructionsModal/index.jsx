import React from "react";
import instructionsImg from "../../assets/instructions.png";
import {
  ModalBg,
  ModalBoxSetup,
  ModalWrapper,
  ModalContainer,
  Title,
  IconContainer,
  Img,
  ImgContainer,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { setOpenInstructionsModal } from "../../slices/modalsSlice";

export const InstructionsModal = () => {
  const show = useSelector((state) => state.modals.instructionsModal);
  const dispatch = useDispatch();

  return (
    show && (
      <ModalWrapper>
        <ModalBoxSetup>
          <ModalContainer>
            <Title>
              Instrucciones
              <IconContainer
                onClick={() => dispatch(setOpenInstructionsModal(false))}
              />
            </Title>
            <ImgContainer>
              <Img src={instructionsImg} alt="Instructions" />
            </ImgContainer>
          </ModalContainer>
        </ModalBoxSetup>
        <ModalBg />
      </ModalWrapper>
    )
  );
};
