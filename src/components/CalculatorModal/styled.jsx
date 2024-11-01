import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  right: 0;
  width: 20%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
`;

export const ModalContent = styled.div`
  background-color: var(--im-gray);
  width: 90%;
  height: 90%;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  border-radius: 8px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  font-size: 25px;
  font-weight: bold;
`;

export const Result = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--im-white);
  color: var(--im-black);
  width: 200px;
  height: 40px;
  border-radius: 8px;
`;

export const Input = styled.input`
  background-color: var(--im-white);
  color: var(--im-black);
  width: 200px;
  height: 40px;
  margin: 10px 0 10px 0;
  border-radius: 8px;
`;

export const CloseButton = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  color: var(--im-lightgray);
  padding: 5px 5px;
  font-weight: bold;
  font-size: 20px;
  &:hover {
    opacity: 0.8;
  }
  cursor: pointer;
`;