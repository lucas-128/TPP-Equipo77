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
  max-width: 85%;
  max-height: 90%;
  margin: 0 auto;
  padding: 12px;
  overflow-y: auto;
  overflow-x: auto;
  text-align: center;
  box-sizing: border-box;
  z-index: 1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
  border: 0.5px solid var(--im-gray);
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(10, 27, 45, 0.15);
  background: var(--im-primary);
  animation: 0.7s ${fadeIn} forwards;
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--im-darkgray);
`;

export const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: rgba(14, 13, 13, 0.589);
`;

export const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;
`;

export const Title = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--im-lightgray);
`;

export const IconContainer = styled(IoClose)`
  cursor: pointer;
  right: 0;
  width: 18px;
  height: 18px;
  margin-left: auto;
  text-align: right;
  color: var(--im-lightgray);
`;

export const Table = styled.table`
  display: flex;
  justify-content: center;
  border-collapse: collapse;
  margin: 10px 0 0 0;
`;

export const Column = styled.td`
  border-right: 1px solid var(--im-darkgray);
  border-left: 1px solid var(--im-darkgray);
`;

export const HeaderCell = styled.th`
  border-bottom: 1px solid var(--im-darkgray);
`;

export const Cell = styled.tr`
  border-top: 1px solid var(--im-darkgray);
`;