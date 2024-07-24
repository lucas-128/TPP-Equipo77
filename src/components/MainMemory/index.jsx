import { useEffect, useState } from "react";
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

  // paginado
  const rowsPerPage = 32;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mainMemoryCells.length / rowsPerPage);
  const currentData = mainMemoryCells.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const currentDataLength = currentData.length;
  const offset = currentDataLength * (currentPage - 1);
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
              {currentData.map((cellValue, index) => (
                <TableRow key={index + offset} colSpan="2">
                  <TableCell>
                    {(index + offset)
                      .toString(16)
                      .toUpperCase()
                      .padStart(2, "0")}
                  </TableCell>
                  <TableCell>{cellValue}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
        <Container>
          <div>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </Container>
      </Container>
    </>
  );
};
