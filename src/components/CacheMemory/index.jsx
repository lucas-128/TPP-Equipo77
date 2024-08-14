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
          {cacheMemoryCells.map((cell, index) => (
            <TableRow key={index} colSpan="2">
              <TableCell>
                {cell ? parseInt(cell.address, 10).toString(16) : "-"}
              </TableCell>
              <TableCell>{cell ? cell.content : "-"}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <CustomHandle
        type="source"
        position="top"
        style={{ background: "#555" }}
      />
    </TableContainer>
  );
};
