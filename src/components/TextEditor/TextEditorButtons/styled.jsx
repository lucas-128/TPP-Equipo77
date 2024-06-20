import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--im-gray);
  gap: 5px;
  padding: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px -1px 2px 0px, rgba(60, 64, 67, 0.15) 0px -2px 6px 2px;
  z-index: 1;
`;

export const Button = styled.div`
  border: none;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  user-select: none;
  padding: 5px 8px;
  color: var(--im-lightgray);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: all 0.15s;

  &:hover {
    background-color: var(--im-gray-lighter);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;
