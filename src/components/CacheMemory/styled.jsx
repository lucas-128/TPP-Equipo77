import styled from "styled-components";

export const TableContainer = styled.div`
  width: fit-content;
  padding: 15px;
  background-color: var(--im-primary);
  border-radius: 10px;
  text-align: center;
  box-shadow: var(--im-shadow);
`;

export const TableTitle = styled.div`
  color: var(--im-white);
  font-weight: bold;
  font-size: 20px;
  padding: 10px 0px 10px 00px;
`;

export const Table = styled.table`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border-collapse: collapse;
  margin: auto;
`;

export const TableRow = styled.tr``;

export const TableHeader = styled.th`
  background-color: var(--im-primary);
  color: var(--im-white);
  padding: 8px;
  text-align: center;
`;

export const TableCell = styled.td`
  padding: 8px;
  border: 1px solid black;
  text-align: center;
  color: black;
  background-color: white;
`;
