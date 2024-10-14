import { React, useState, useMemo } from "react";
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
  DirectionColumn,
  Cell,
  DataColumn,
  ColumnContainer,
} from "./styled";
import { convertValue } from "../../interpreter/utils";

const MainMemoryModal = () => {
  const dispatch = useDispatch();

  const mainMemoryCells = useSelector(
    (state) => state.application.execute.mainMemoryCells
  );
  const numericBase = useSelector((state) => state.application.numericBase);
  const showModal = useSelector((state) => state.modals.mainMemoryModal);
  const closeModal = () => dispatch(setOpenMainMemoryModal(false));

  const toHexa = (value, offset) => {
    return (value + offset).toString(16).toUpperCase().padStart(2, "0");
  };

  const columnsIndex = [0, 1, 2, 3, 4, 5, 6, 7];

  const mainMemryCellsToShow = useMemo(() => {
    return mainMemoryCells?.map((value) => convertValue(value, numericBase));
  }, [numericBase, mainMemoryCells]);

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
                  <ColumnContainer>
                    <DirectionColumn>
                      {mainMemoryCells
                        .slice(i * 32, (i + 1) * 32)
                        .map((_value, index) => (
                          <Cell>{toHexa(index, i * 32)}</Cell>
                        ))}
                    </DirectionColumn>
                    <DataColumn>
                      {mainMemryCellsToShow
                        .slice(i * 32, (i + 1) * 32)
                        .map((value, _index) => (
                          <Cell>{value}</Cell>
                        ))}
                    </DataColumn>
                  </ColumnContainer>
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
