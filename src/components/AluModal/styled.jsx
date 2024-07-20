import { IoClose } from "react-icons/io5";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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
  display: block;
  margin: 0 auto;
  overflow-y: hidden;
  overflow-x: hidden;
  text-align: center;
  box-sizing: border-box;
  z-index: 1;
  animation: 0.7s ${fadeIn} forwards;
`;

export const AluContainer = styled.div`
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
  border: 0.5px solid var(--im-gray);
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(10, 27, 45, 0.15);
  background: var(--im-primary);
  clip-path: polygon(0 0, 100% 29%, 100% 67%, 0 100%, 0% 69%, 24% 48%, 0 29%);
  width: 550px;
  height: 580px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  justify-content: center;
`;

export const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: rgba(2, 2, 2, 0.857);
`;

export const InfoContainer = styled.div`
  display: flex;
  width: 300px;
  align-items: center;
  flex-direction: row;
  padding: 30px;
  margin-right: 30px;
  background-color: var(--im-white);
  color: var(--im-darkgray);
  border-radius: 5px;
  filter: drop-shadow(1px 1px 15px rgba(112, 135, 165, 0.39));
`;

export const Info = styled.div`
  width: 100%;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Icon = styled(IoClose)`
  cursor: pointer;
  right: 0;
  width: 18px;
  height: 18px;
  margin-left: auto;
  text-align: right;
  color: var(--im-lightgray);
`;

export const Line = styled.div`
  background-color: #f8f8fa;
  height: 2px;
  margin: 10px 0 0 0;
`;

export const Bus = styled.div`
  height: 130px;
  width: 200px;
  background-color: var(--im-gray);

  &:nth-child(1) {
    margin-top: 20px;
  }

  &:nth-child(2) {
    margin-bottom: 20px;
  }
`;

export const StartBusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  height: 580px;
`;

export const EndBusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  height: 580px;

  ${Bus} {
    margin: 0px 0px 20px 0px;
  }
`;
