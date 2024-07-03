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
} from "./styled";
import { Handle } from "reactflow";
import { useSelector } from "react-redux";

export const MainMemory = () => {
  const mainMemoryCells = useSelector(
    (state) => state.application.mainMemoryCells
  );

  return (
    <>
      <Container>
        <Handle type="target" position="top" style={{ background: "#555" }} />
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
      </Container>
    </>
  );
};
