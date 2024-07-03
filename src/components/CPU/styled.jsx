import styled from "styled-components";

export const Container = styled.div`
  align-self: center;
  color: var(--im-lightgray);
  display: flex;
  justify-content: center;
  padding-top: 20px;
  background-color: #646464;
  border: 1px solid black;
  border-radius: 10px;
  width: 1000px;
  height: 1050px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 50px 100px -20px, rgba(139, 139, 139, 0.3) 0px 30px 60px -30px, rgba(186, 186, 186, 0.37) 0px -2px 6px 0px inset;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
  }
  z-index: -1;
`;
  