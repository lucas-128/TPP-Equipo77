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
          {Array.from({ length: 8 }).map((_, index) => (
            <TableRow key={index} colSpan="2">
              <TableCell> - </TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <CustomHandle
        type="target"
        position="bottom"
        style={{ background: "#555" }}
      />
      <CustomHandle
        type="source"
        position="bottom"
        style={{ background: "#555" }}
      />
    </TableContainer>
  );
};
