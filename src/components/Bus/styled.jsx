import styled, { keyframes } from "styled-components";

const progress = keyframes`
    0%{
      height: 0%;
    }
    25%{
        height: 50%;
    }
    50%{
        height: 75%;
    }
    75%{
        height: 85%;
    }
    100%{
        height: 100%;
    }
`;

export const ArrowContainer = styled.div`
  position: absolute;
  display: flex;
  height: 100vh;
`;

export const Progress = styled.div`
  position: relative;
  height: 10px;
  width: 1110%;
  border: 10px solid #f4a261;
  border-radius: 15px;
`;

export const ProgressColor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  background-color: gray;
  height: 100px;
  width: 15px;
  opacity: 0.5;
  animation: ${progress} 4s infinite linear;
`;

export const Byte = styled.div`
  height: 5px;
  width: 15px;
  background-color: lightgreen;
  z-index: 100;
`;

export const ArrowStart = styled.div`
  position: absolute;
  height: 100px;
  width: 15px;
  background-color: black;

  /* &:after {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    left: -13px;
    top: 100%;
    border: 20px solid transparent;
    border-left: 20px solid black;
    transform: rotate(90deg);
  } */
`;
