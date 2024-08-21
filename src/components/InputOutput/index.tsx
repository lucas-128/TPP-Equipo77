import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Table,
  TableCell,
  TableContainer,
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
      <Title>Entrada (FE)</Title>
      <TableContainer>
        <Table>
          <tbody>
            <TableRow>
              <TableCell>{inputCell}</TableCell>
            </TableRow>
          </tbody>
        </Table>
      </TableContainer>
      <Title>Salida (FF)</Title>
      <TableContainer>
        <Table>
          <tbody>
            <TableRow>
              <TableCell>{outputCell}</TableCell>
            </TableRow>
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default InputOutput;
