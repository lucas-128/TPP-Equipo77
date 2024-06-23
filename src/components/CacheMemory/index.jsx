import {
  TableContainer,
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from "./styled";

export const CacheMemory = () => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <TableRow>
            <TableHeader colSpan="2">Memoria Cache</TableHeader>
          </TableRow>
          <TableRow>
            <TableHeader>Direccion</TableHeader>
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
    </TableContainer>
  );
};
