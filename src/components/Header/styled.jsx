import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  height: 30px;
  padding: 5px 10px;
  background-color: var(--im-darkgray);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
  user-select: none;
`;

export const HeaderTitle = styled.div`
  font-size: 15px;
  color: var(--im-lighgray);
  font-weight: 700;
  user-select: none;
`;

export const HeaderSelect = styled.select`
  background-color: var(--im-darkgray);
  color: var(--im-lightgray);
  border: 1px solid var(--im-lightgray);
  font-size: 12px;
  font-weight: 700;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
`;

export const HeaderOption = styled.option`
  background-color: var(--im-darkgray);
  color: var(--im-lightgray);
  font-size: 12px;
  user-select: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

export const HeaderPipeliningColorReference = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--im-lightgray);
  background-color: var(--im-black);
  border-radius: 5px;
  padding: 3px 5px 3px 5px;
  font-size: 15px;
  font-weight: bold;
`;

export const FetchCycle = styled.div`
  margin-right: 5px;
`;

export const Cycle = styled.div`
  margin-right: 5px;
  margin-left: 15px;
`;
