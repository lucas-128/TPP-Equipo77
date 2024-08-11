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

const MainMemoryModal = () => {
  const dispatch = useDispatch();

  const mainMemoryCells = useSelector(
    (state) => state.application.execute.mainMemoryCells
  );
  const showModal = useSelector((state) => state.modals.mainMemoryModal);
  const closeModal = () => dispatch(setOpenMainMemoryModal(false));

  const toHexa = (value, offset) => {
    return (value + offset).toString(16).toUpperCase().padStart(2, "0");
  };

  const columnsIndex = [0, 1, 2, 3, 4, 5, 6, 7];

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
              {columnsIndex.map((i) => {
                return (
                  <div
                    style={{
                      background:
                        i % 2 === 0 ? "var(--im-lightgray)" : "var(--im-white)",
                    }}
                  >
                    <Column>
                      <HeaderCell>Dirección</HeaderCell>
                      {mainMemoryCells
                        .slice(i * 32, (i + 1) * 32)
                        .map((_value, index) => (
                          <Cell>{toHexa(index, i * 32)}</Cell>
                        ))}
                    </Column>
                    <Column>
                      <HeaderCell>Contenido</HeaderCell>
                      {mainMemoryCells
                        .slice(i * 32, (i + 1) * 32)
                        .map((value, _index) => (
                          <Cell>{value}</Cell>
                        ))}
                    </Column>
                  </div>
                );
              })}
            </Table>
          </ModalContainer>
        </ModalBoxSetup>
        <ModalBg />
      </ModalWrapper>
    )
  );
};

export default MainMemoryModal;
