import { Handle } from "reactflow";
import styled, { keyframes, css } from "styled-components";

export const MainContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--im-primary);
  border-radius: 10px;
  padding: 25px;
  overflow: hidden;
  box-shadow: var(--im-shadow);
  cursor: pointer;

  &:hover {
    background-color: var(--im-primary-hover);
    box-shadow: var(--im-shadow-hover);
  }
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

export const SpecialRegisterContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;

export const SpecialRegisterValue = styled.div`
  background-color: var(--im-white);
  border-radius: 5px;
  padding: 5px;
  color: var(--im-darkgray);
  min-width: ${(props) => (props.id == "PC" ? "50px" : "100px")};
  display: flex;
  justify-content: center;
  border: 1px solid black;
`;

export const CustomText = styled.p`
  color: var(--im-white);
  font-size: 16px;
  font-weight: bold;
  margin: 0px;
`;

export const HeaderText = styled.p`
  color: var(--im-white);
  font-size: 22px;
  font-weight: bold;
  margin: 0px 0px 20px 0px;
`;

const pulse = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const IndicatorText = styled.p.withConfig({
  shouldForwardProp: (prop) => !["animate"].includes(prop),
})`
  color: var(--im-white);
  font-size: 14px;
  font-weight: bold;
  margin: 20px 0px 0px 0px;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${pulse} 1s infinite;
    `}
`;

export const CustomHandle = styled(Handle)`
  background-color: transparent !important;
  border: none;
  pointer-events: none;
`;
