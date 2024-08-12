import React, { useEffect, useState } from "react";
import {
  ControlUnitContainer,
  Bus,
  StartBusContainer,
  CloseButton,
  InfoContainer,
  ModalBg,
  ModalBoxSetup,
  ModalContainer,
  ModalWrapper,
  EndBusContainer,
  AddrBus,
  DataBus,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { setOpenAluZoom, setOpenControlUnitZoom } from "../../slices/modalsSlice";
import { Button } from "../Button";

export const ControlUnitModal = () => {
  const showModal = useSelector((state) => state.modals.controlUnitZoom);
  const dispatch = useDispatch();

  return (
    showModal && (
      <ModalWrapper>
        <ModalBoxSetup>
          <ModalContainer>
            <StartBusContainer>
              <Bus>Bus hacia los registros</Bus>
            </StartBusContainer>
            <ControlUnitContainer>
              <InfoContainer></InfoContainer>
            </ControlUnitContainer>
            <EndBusContainer>
              <DataBus>Bus de datos</DataBus>
              <AddrBus>Bus de direcciones</AddrBus>
            </EndBusContainer>
          </ModalContainer>
          <CloseButton onClick={() => dispatch(setOpenControlUnitZoom(false))}>
            Cerrar
            <IoClose />
          </CloseButton>
        </ModalBoxSetup>
        <ModalBg />
      </ModalWrapper>
    )
  );
};
