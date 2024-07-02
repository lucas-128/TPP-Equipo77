import styled from "styled-components";

export const Container = styled.div`
  align-self: center;
  color: var(--im-primary);
  display: flex;
  justify-content: center;
  padding-top: 20px;
  background-color: var(--im-white);
  border: 3px solid black;
  border-radius: 10px;
  width: 400px;
  height: 1050px;
  overflow: hidden;
  text-align: center;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  cursor: pointer;
  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
  }
`;
