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
  max-width: 900px;
  max-height: 800px;
  overflow-y: hidden;
  overflow-x: hidden;
  text-align: center;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
  border: 0.5px solid var(--im-gray);
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(10, 27, 45, 0.15);
  background: var(--im-primary);
  animation: 0.7s ${fadeIn} forwards;
`;

export const ModalContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--im-darkgray);
  overflow: hidden;
`;

export const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: rgba(14, 13, 13, 0.589);
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 800;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
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

export const Img = styled.img`
  width: 97%;
  height: 100%;
  padding: 10px;
`;

export const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
