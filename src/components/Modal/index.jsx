import React from "react";
import {
  Entry,
  Text,
  IconContainer,
  InfoContainer,
  ModalBg,
  ModalBoxSetup,
  ModalContainer,
  ModalWrapper,
  TextContainer,
  Title,
} from "./styled";

export const Modal = ({ title, msg, onClose, children }) => {

  return (
    <ModalWrapper>
      <ModalBoxSetup>
        <ModalContainer>
          <InfoContainer>
            <Title>{title}</Title>
            <IconContainer onClick={onClose}></IconContainer>
          </InfoContainer>
          <TextContainer>
            <Entry>
              <Text>{msg}</Text>
            </Entry>
            {children}
          </TextContainer>
        </ModalContainer>
      </ModalBoxSetup>
      <ModalBg />
    </ModalWrapper>
  );
}