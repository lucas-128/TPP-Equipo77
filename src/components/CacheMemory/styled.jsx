import { Handle } from "reactflow";
import styled from "styled-components";

export const TableHeader = styled.th`
  background-color: var(--im-primary);
  color: var(--im-white);
  padding: 8px;
  text-align: center;
`;

export const TableContainer = styled.div`
  width: fit-content;
  padding: 15px;
  background-color: var(--im-primary);
  border-radius: 10px;
  text-align: center;
  box-shadow: var(--im-shadow);
  cursor: pointer;

  &:hover {
    background-color: var(--im-primary-hover);
    box-shadow: var(--im-shadow-hover);

    ${TableHeader} {
      background-color: var(--im-primary-hover);
    }
  }
`;

export const TableTitle = styled.div`
  color: var(--im-white);
  font-weight: bold;
  font-size: 22px;
`;

export const Table = styled.table`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border-collapse: collapse;
  margin: auto;
`;

export const TableRow = styled.tr``;

export const TableCell = styled.td`
  padding: 4 px;
  border: 1px solid black;
  text-align: center;
  color: black;
  background-color: var(--im-white);
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const PaginationButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const CustomHandle = styled(Handle)`
  background-color: transparent !important;
  border: none;
  pointer-events: none;
`;
