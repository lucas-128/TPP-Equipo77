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
  z-index: 12;
  min-width: 80px;
  max-width: ${(props) => (props.$width ? props.$width : "600px")};
  border-radius: 16px;
  filter: drop-shadow(0px 1px 8px rgba(112, 135, 165, 0.39));
  display: flex !important;
  cursor: default !important;
  padding: 10px 20px 20px 20px;
  margin: 30px;

  &:before {
    content: "";
    position: absolute;
    border-radius: 0;
    height: 25px;
    width: 25px;
    background-color: var(--im-lightgray);
    top: ${(props) => props.$direction.top};
    left: ${(props) => props.$direction.left};
    display: ${(props) => (props.$direction.hide ? "none" : "")};
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
  font-size: 15px;
  justify-content: center;
  width: 100%;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.$color};
`;

export const TextContainer = styled.div`
  margin-top: 5px;
  p {
    margin: 0px 10px 15px 10px;
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: center;
`;

export const ModalBoxSetup = styled.div`
  position: absolute;
  left: ${(props) => props.$position.left};
  top: ${(props) => props.$position.top};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
  overflow-x: hidden;
  text-align: center;
  z-index: 1;
  animation: 0.7s ${fadeIn} forwards;
  transition: 0.3s;
`;

export const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: rgba(14, 13, 13, 0.589);
`;
