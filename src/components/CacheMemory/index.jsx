import { useSelector } from "react-redux";
import { cacheMemoryId } from "../../containers/SimulatorSection/components";
import {
  TableContainer,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  TableTitle,
  ButtonsContainer,
  PaginationButton,
  CustomHandle,
} from "./styled";
import { useMemo, useState } from "react";

export const CacheMemory = () => {
  const cacheMemoryCells = useSelector(
    (state) => state.application.execute.cacheMemoryCells
  );

  const rowsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => Math.ceil(cacheMemoryCells.length / rowsPerPage),
    [cacheMemoryCells.length, rowsPerPage]
  );

  const currentData = useMemo(
    () =>
      cacheMemoryCells.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      ),
    [cacheMemoryCells, currentPage, rowsPerPage]
  );

  const offset = useMemo(
    () => currentData.length * (currentPage - 1),
    [currentData.length, currentPage]
  );

  return (
    <TableContainer id={cacheMemoryId}>
      <TableTitle>Memoria Caché</TableTitle>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Dirección</TableHeader>
            <TableHeader>Contenido</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {currentData.map((cell, index) => (
            <TableRow key={index + offset} colSpan="2">
              <TableCell>{cell ? cell.address : '-'}</TableCell>
              <TableCell>{cell ? cell.content : '-' }</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
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
      <CustomHandle
        type="source"
        position="top"
        style={{ background: "#555" }}
      />
      {/*<CustomHandle
        type="target"
        position="bottom"
        style={{ background: "#555" }}
      />
      <CustomHandle
        type="source"
        position="bottom"
        style={{ background: "#555" }}
      />*/}
    </TableContainer>
  );
};
