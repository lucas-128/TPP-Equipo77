import React, { useEffect, useState } from "react";
import {
  AluContainer,
  Bus,
  StartBusContainer,
  Icon,
  InfoContainer,
  ModalBg,
  ModalBoxSetup,
  ModalContainer,
  ModalWrapper,
  EndBusContainer,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { setOpenAluZoom } from "../../slices/modalsSlice";

export const AluModal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modals.aluZoom);
  const aluOperation = useSelector((state) => state.application.aluOperation);

  return (
    showModal && (
      <ModalWrapper>
        <ModalBoxSetup>
          <ModalContainer>
            {/* <IconContainer
              onClick={() => dispatch(setOpenAluZoom(false))}
            ></IconContainer> */}
            <StartBusContainer>
              <Bus>un bus</Bus>
              <Bus>otro bus</Bus>
            </StartBusContainer>
            <AluContainer>
              <InfoContainer>Aca va información</InfoContainer>
            </AluContainer>
            <EndBusContainer>
              <Bus>un bus</Bus>
            </EndBusContainer>
          </ModalContainer>
        </ModalBoxSetup>
        <ModalBg />
      </ModalWrapper>
    )
  );
};
