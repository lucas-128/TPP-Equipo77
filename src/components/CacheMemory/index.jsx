import { useSelector } from "react-redux";
import { cacheMemoryId } from "../../containers/SimulatorSection/components";
import {
  TableContainer,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  TableTitle,
  CustomHandle,
} from "./styled";

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
                {cell
                  ? parseInt(cell.address, 10).toString(16).padStart(2, "0")
                  : "-"}
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
