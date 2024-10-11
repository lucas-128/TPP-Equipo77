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
  width: 1000px;
  max-height: 700px;
  padding: 10px;
  margin: 0 auto;
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
  justify-content: center;
  align-items: center;
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

export const Table = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  margin-top: 10px;

  max-height: 500px;
  overflow-y: auto;
  border-radius: 2px;
  box-shadow: var(--im-shadow);
  gap: 5px;
`;

export const DirectionColumn = styled.div`
  flex-direction: column;
  border-radius: 10px;
  font-size: 12px;
  padding: 0px 1px;
`;

export const DataColumn = styled.div`
  flex-direction: column;
  border-left: 2px solid var(--im-darkgray);
  width: 95px;
  font-size: 12px;
  height: 100%;
`;

export const Cell = styled.div`
  flex-direction: row;
  border-bottom: 1px solid var(--im-darkgray);

  &:last-child {
    border: none;
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
  background: var(--im-white);
  height: 100%;
  border-radius: 2px;
`;
