import { CgClose } from "react-icons/cg";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Container = styled.div`
  height: 7 0px;
  background-color: var(--im-lightgray);
  z-index: 1;
  min-width: 80px;
  max-width: 500px;
  border-radius: 16px;
  filter: drop-shadow(0px 1px 8px rgba(112, 135, 165, 0.39));
  display: flex !important;
  cursor: default !important;
  padding: 10px;
  margin: 5px;

  &:before {
    content: "";
    position: absolute;
    border-radius: 0;
    height: 15px;
    width: 15px;
    background-color: var(--im-lightgray);
    top: ${(props) => props.$direction.top};
    left: ${(props) => props.$direction.left};
    transform: rotate(45deg);
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

export const CloseButton = styled.div`
  cursor: pointer;
  font-size: 11px;
  color: var(--im-darkgray);
  text-decoration: underline;
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Content = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--im-darkgray);
  font-size: 16px;
  justify-content: center;
  width: 100%;
`;

export const Title = styled.div`
  margin-top: -5px;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.$color};
`;

export const TextContainer = styled.div`
  padding: 5px 0px;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const ModalBoxSetup = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  overflow-y: hidden;
  overflow-x: hidden;
  text-align: center;
  z-index: 1;
  animation: 0.7s ${fadeIn} forwards;
`;

export const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: rgba(14, 13, 13, 0.589);
`;
