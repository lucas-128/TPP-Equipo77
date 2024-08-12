import styled from "styled-components";

// make a globe to put in the buses to explain whts going on
export const Container = styled.div`
  height: 132px;
  width: 339px;
  background-color: white;
  position: absolute;
  bottom: 70px;
  right: calc(50% - 162px);
  border-radius: 10px;
  filter: drop-shadow(1px 1px 15px rgba(112, 135, 165, 0.39));
  z-index: 10;

  //point for arrow
  &::after {
    content: "";
    background-color: white;
    height: 25px;
    width: 25px;
    margin-top: 10px;
    margin-left: calc(50% - 86px);
    transform: rotate(45deg);
    display: table-cell;
    z-index: 10;
  }
  &:hover {
    transform: scale(1.1);
  }
`;
