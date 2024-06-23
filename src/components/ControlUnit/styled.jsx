import styled from "styled-components";

export const MainContainer = styled.div`
  align-self: center;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: lightblue;
  border: 1px solid black;
  border-radius: 10px;
  width: 400px;
  height: 150px;
  overflow: hidden;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  cursor: pointer;
  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
  }
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
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
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  color: black;
  width: 50%;
  display: flex;
  justify-content: center;
  border: 1px solid black;
`;

export const CustomText = styled.p`
  color: black;
  font-size: 16px;
  font-weight: bold;
  margin: 0px;
`;

export const HeaderText = styled.p`
  color: black;
  font-size: 20px;
  font-weight: bold;
  margin: 0px;
`;
