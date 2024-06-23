import { Handle } from "reactflow";
import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 650px;
  width: 200px;
  padding: 10px;
  cursor: pointer;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  background-color: lightblue;
  border-radius: 10px;
  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
  }
  border: 1px solid black;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  color: black;
  width: 100%;
`;

export const TitleText = styled.p`
  margin: 0px;
  font-size: 20px;
  font-weight: bold;
`;

export const RegistersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  height: 100%;
  width: 100%;
`;

export const RegisterContainer = styled.div`
  display: flex;
  background-color: white;
  color: black;
  height: 20px;
  width: 100%;
  border-radius: 3px;
  border: 1px solid black;
  align-items: center;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

export const RegisterNumeration = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid black;
  padding-left: 5px;
  padding-right: 5px;
`;

export const RegisterValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const CustomHandle = styled(Handle)`
  background-color: black !important;
  border: none;
  pointer-events: none;
`;
