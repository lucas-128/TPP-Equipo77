import { useState } from "react";
import {
  Container,
  TableContainer,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  Title,
  HeaderCellText,
  CustomHandle,
} from "./styled";
import { Handle } from "reactflow";
import { useSelector } from "react-redux";
import { mainMemoryId } from "../../containers/SimulatorSection/components";

export const MainMemory = () => {
  const mainMemoryCells = useSelector(
    (state) => state.application.mainMemoryCells
  );

  return (
    <>
      <Container id={mainMemoryId}>
        <Title>Memoria principal</Title>
        <TableContainer>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>
                  <HeaderCellText>Direccion</HeaderCellText>
                </TableHeader>
                <TableHeader>
                  <HeaderCellText>Contenido</HeaderCellText>
                </TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {mainMemoryCells.map((cellValue, index) => (
                <TableRow key={index} colSpan="2">
                  <TableCell>
                    {index.toString(16).toUpperCase().padStart(2, "0")}
                  </TableCell>
                  <TableCell>{cellValue}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
        <CustomHandle type="source" position="left" />
        <CustomHandle type="target" position="left" />
        <CustomHandle type="target" position="left" />
      </Container>
    </>
  );
};
