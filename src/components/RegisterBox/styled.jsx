import styled from "styled-components";

export const Box = styled.div`
  position: relative;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 250px;
  background-color: gray;
  border-radius: 10px;
  border: 1px solid black;
  margin: 10px;
  cursor: pointer;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
  }
`;
