import { useMemo, useState } from "react";
import {
  Container,
  TableContainer,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  Title,
  HeaderCellText,
  ButtonsContainer,
  PaginationButton,
  CustomHandle,
} from "./styled";
import { useSelector } from "react-redux";
import { mainMemoryId } from "../../containers/SimulatorSection/components";

export const MainMemory = () => {
  const mainMemoryCells = useSelector(
    (state) => state.application.execute.mainMemoryCells
  );

  const rowsPerPage = 32;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMemo(
    () => Math.ceil(mainMemoryCells.length / rowsPerPage),
    [mainMemoryCells.length, rowsPerPage]
  );
  const currentData = useMemo(
    () =>
      mainMemoryCells.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      ),
    [mainMemoryCells, currentPage, rowsPerPage]
  );
  const offset = useMemo(
    () => currentData.length * (currentPage - 1),
    [currentData.length, currentPage]
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
                  <HeaderCellText>Dirección</HeaderCellText>
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
        <ButtonsContainer>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <div>
            <PaginationButton
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </PaginationButton>
            <PaginationButton
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </PaginationButton>
          </div>
        </ButtonsContainer>
        <CustomHandle type="source" position="left" />
        <CustomHandle type="target" position="left" />
      </Container>
    </>
  );
};
