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
      <TableRow>
      <Title>Entrada (FE)</Title>
        <TableCell>{inputCell}</TableCell>
      </TableRow>
      <TableRow>
      <Title>Salida (FF)</Title>
        <TableCell>{outputCell}</TableCell>
      </TableRow>
    </Container>
  );
};

export default InputOutput;
