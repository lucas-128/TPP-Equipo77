import { Handle } from "reactflow";
import styled from "styled-components";

export const Container = styled.div`
  align-self: center;
  color: var(--im-lightgray);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--im-primary);
  border-radius: 10px;
  width: 230px;
  gap: 5px;
  height: 975px;
  padding: 15px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  cursor: grab;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const TableRow = styled.div`
  background-color: var(--im-white);
  display: flex;
  flex-direction: row;
  color: var(--im-darkgray);
  border-radius: 3px;
  font-size: 16.5px;
  width: 100%;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const CellNumeration = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid black;
  width: 15%;
`;

export const CellValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
