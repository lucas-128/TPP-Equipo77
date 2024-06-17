import styled, { keyframes } from "styled-components";

const verticalProgress = keyframes`
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

const horizontalProgress = keyframes`
0%{
  width: 0%;
}
25%{
  width: 50%;
}
50%{
  width: 75%;
}
75%{
  width: 85%;
}
100%{
  width: 100%;
}
`;

export const Progress = styled.div`
  position: relative;
  height: 10px;
  width: 1110%;
  border: 10px solid #f4a261;
  border-radius: 15px;
`;

export const VerticalProgressColor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  background-color: gray;
  height: 100px;
  width: 15px;
  opacity: 0.5;
  animation: ${verticalProgress} 4s infinite linear;
  animation-delay: s;
`;

export const Byte = styled.div`
  height: 5px;
  width: 20px;
  background-color: lightgreen;
`;

export const VerticalSection = styled.div`
  position: relative;
  height: 100px;
  width: 20px;
  background-color: black;
`;


export const HorizontalSection = styled.div`
  position: relative;
  width: 100px;
  height: 20px;
  background-color: black;
`;


export const HorizontalProgressColor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  background-color: gray;
  width: 100px;
  height: 20px;
  opacity: 0.5;
  animation: ${horizontalProgress} 4s infinite linear;
  animation-delay: 4s;
`;