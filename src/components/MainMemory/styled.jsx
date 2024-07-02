import styled from "styled-components";

export const Container = styled.div`
  align-self: center;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eeeded;
  border: 3px solid black;
  border-radius: 10px;
  width: 400px;
  height: 1050px;
  padding-left: 15px;
  padding-right: 15px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  cursor: pointer;
  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
  }
  gap: 20px;
`;

export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr``;

export const TableHeader = styled.th`
  background-color: lightblue;
  color: black;
  padding: 8px;
  text-align: center;
  border: 1px solid black;
`;

export const TableCell = styled.td`
  padding: 2px;
  border: 1px solid black;
  text-align: center;
  color: black;
`;

export const TitleText = styled.h1`
  font-size: 32px;
  color: black;
  margin: 0;
`;

export const HeaderCellText = styled.p`
  font-size: 18px;
  color: black;
  margin: 0;
`;
