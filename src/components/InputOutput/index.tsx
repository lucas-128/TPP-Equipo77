import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  HeaderCellText,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  Title,
} from "./styled";

const InputOutput = () => {
  const mainMemoryCells = useSelector(
    (state) => state.application.execute.mainMemoryCells
  );

  const [inputCell, setInputCell] = useState("");
  const [outputCell, setOutputCell] = useState("");

  useEffect(() => {
    const len = mainMemoryCells.length;
    setInputCell(mainMemoryCells[len - 2]);
    setOutputCell(mainMemoryCells[len - 1]);
  }, [mainMemoryCells]);

  return (
    <Container>
      <Title>Puerto de Entrada/Salida</Title>
      <TableContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>
                <HeaderCellText>Dirección</HeaderCellText>
              </TableHeader>
              <TableHeader>
                <HeaderCellText>Contenido</HeaderCellText>
              </TableHeader>
            </TableRow>
          </thead>
          <tbody>
            <TableRow>
              <TableCell>FE</TableCell>
              <TableCell>{inputCell}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>FF</TableCell>
              <TableCell>{outputCell}</TableCell>
            </TableRow>
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default InputOutput;
