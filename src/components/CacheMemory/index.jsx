import {
  TableContainer,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  TableTitle,
} from "./styled";

export const CacheMemory = () => {
  return (
    <TableContainer>
      <TableTitle>Memoria Cache</TableTitle>
      <Table>
        <thead>
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
