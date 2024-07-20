import styled, {keyframes} from "styled-components";
import { Handle } from "reactflow";

const shine = keyframes`
  100% {
    background-color: #275d78;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 4px 16px, rgba(247, 247, 247, 0.1) 0px 8px 24px, rgba(255, 255, 255, 0.1) 0px 16px 56px;
  }
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--im-white);
  background: ${(props) =>
    props.$operating ? "red" : "var(--im-primary)"};
  width: 150px;
  height: 180px;
  clip-path: polygon(0 0, 100% 29%, 100% 67%, 0 100%, 0% 69%, 24% 48%, 0 29%);
  box-shadow: var(--im-shadow);
  cursor: pointer;
  animation: ${shine} 0.8s infinite alternate;

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
