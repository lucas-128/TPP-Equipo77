import { React } from "react";
import { setOpenMainMemoryModal } from "../../slices/modalsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  ModalWrapper,
  ModalBoxSetup,
  ModalContainer,
  InfoContainer,
  Title,
  IconContainer,
  ModalBg,
  Table,
  Column,
  HeaderCell,
  Cell,
} from "./styled";

export const MainMemoryModal = () => {
  const dispatch = useDispatch();

  const mainMemoryCells = useSelector(
    (state) => state.application.mainMemoryCells
  );
  const showModal = useSelector((state) => state.modals.mainMemoryModal);
  const closeModal = () => dispatch(setOpenMainMemoryModal(false));

  const toHexa = (value, offset) => {
    return (value + offset).toString(16).toUpperCase().padStart(2, "0");
  };

  return (
    showModal && (
      <ModalWrapper>
        <ModalBoxSetup>
          <ModalContainer>
            <InfoContainer>
              <Title>Memoria principal</Title>
              <IconContainer onClick={closeModal}></IconContainer>
            </InfoContainer>
            <Table>
              <div style={{ background: "var(--im-lightgray)" }}>
                <Column>
                  <HeaderCell>Dirección</HeaderCell>
                  {mainMemoryCells.slice(0, 32).map((_cell, index) => (
                    <Cell>{toHexa(index, 0)}</Cell>
                  ))}
                </Column>
                <Column>
                  <HeaderCell>Contenido</HeaderCell>
                  {mainMemoryCells.slice(0, 32).map((cell, _index) => (
                    <Cell>{cell}</Cell>
                  ))}
                </Column>
              </div>
              <Column>
                <HeaderCell>Dirección</HeaderCell>
                {mainMemoryCells.slice(32, 64).map((_cell, index) => (
                  <Cell>{toHexa(index, 32)}</Cell>
                ))}
              </Column>
              <Column>
                <HeaderCell>Contenido</HeaderCell>
                {mainMemoryCells.slice(32, 64).map((cell, _index) => (
                  <Cell>{cell}</Cell>
                ))}
              </Column>
              <div style={{ background: "var(--im-lightgray)" }}>
                <Column>
                  <HeaderCell>Dirección</HeaderCell>
                  {mainMemoryCells.slice(64, 96).map((_cell, index) => (
                    <Cell>{toHexa(index, 64)}</Cell>
                  ))}
                </Column>
                <Column>
                  <HeaderCell>Contenido</HeaderCell>
                  {mainMemoryCells.slice(64, 96).map((cell, _index) => (
                    <Cell>{cell}</Cell>
                  ))}
                </Column>
              </div>
              <Column>
                <HeaderCell>Dirección</HeaderCell>
                {mainMemoryCells.slice(96, 128).map((_cell, index) => (
                  <Cell>{toHexa(index, 96)}</Cell>
                ))}
              </Column>
              <Column>
                <HeaderCell>Contenido</HeaderCell>
                {mainMemoryCells.slice(96, 128).map((cell, _index) => (
                  <Cell>{cell}</Cell>
                ))}
              </Column>
              <div style={{ background: "var(--im-lightgray)" }}>
                <Column>
                  <HeaderCell>Dirección</HeaderCell>
                  {mainMemoryCells.slice(128, 160).map((_cell, index) => (
                    <Cell>{toHexa(index, 128)}</Cell>
                  ))}
                </Column>
                <Column>
                  <HeaderCell>Contenido</HeaderCell>
                  {mainMemoryCells.slice(128, 160).map((cell, _index) => (
                    <Cell>{cell}</Cell>
                  ))}
                </Column>
              </div>
              <Column>
                <HeaderCell>Dirección</HeaderCell>
                {mainMemoryCells.slice(160, 192).map((_cell, index) => (
                  <Cell>{toHexa(index, 160)}</Cell>
                ))}
              </Column>
              <Column>
                <HeaderCell>Contenido</HeaderCell>
                {mainMemoryCells.slice(160, 192).map((cell, _index) => (
                  <Cell>{cell}</Cell>
                ))}
              </Column>
              <div style={{ background: "var(--im-lightgray)" }}>
                <Column>
                  <HeaderCell>Dirección</HeaderCell>
                  {mainMemoryCells.slice(192, 224).map((_cell, index) => (
                    <Cell>{toHexa(index, 192)}</Cell>
                  ))}
                </Column>
                <Column>
                  <HeaderCell>Contenido</HeaderCell>
                  {mainMemoryCells.slice(192, 224).map((cell, _index) => (
                    <Cell>{cell}</Cell>
                  ))}
                </Column>
              </div>
              <Column>
                <HeaderCell>Dirección</HeaderCell>
                {mainMemoryCells.slice(224, 256).map((_cell, index) => (
                  <Cell>{toHexa(index, 224)}</Cell>
                ))}
              </Column>
              <Column>
                <HeaderCell>Contenido</HeaderCell>
                {mainMemoryCells.slice(224, 256).map((cell, _index) => (
                  <Cell>{cell}</Cell>
                ))}
              </Column>
            </Table>
          </ModalContainer>
        </ModalBoxSetup>
        <ModalBg />
      </ModalWrapper>
    )
  );
};

export default MainMemoryModal;
