import styled, { keyframes, css } from "styled-components";
import { Handle } from "reactflow";

const shine = keyframes`
  100% {
    background-color: #2c5d75;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2),
                0 0 10px rgba(255, 255, 255, 0.2),
                0 0 20px rgba(255, 255, 255, 0.2),
                0 0 30px rgba(255, 255, 255, 0.2),
                0 0 40px rgba(255, 255, 255, 0.2);
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--im-white);
  background: var(--im-primary);
  width: 150px;
  height: 180px;
  clip-path: polygon(0 0, 100% 29%, 100% 67%, 0 100%, 0% 69%, 24% 48%, 0 29%);
  box-shadow: var(--im-shadow);
  cursor: pointer;
  animation: ${(props) =>
    props.$operating
      ? css`
          ${shine} 0.7s infinite alternate
        `
      : "none"};

  &:hover {
    background-color: var(--im-primary-hover);
    box-shadow: var(--im-shadow-hover);
    animation-play-state: paused;
  }
`;

export const CustomHandle = styled(Handle)`
  background-color: transparent !important;
  border: none;
  pointer-events: none;
`;
