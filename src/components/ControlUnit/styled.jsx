import styled from "styled-components";

export const MainContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--im-primary);
  border-radius: 10px;
  width: 400px;
  height: 150px;
  overflow: hidden;
  box-shadow: var(--im-shadow);
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
  color: var(--im-white);
  width: 50%;
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
  font-size: 20px;
  font-weight: bold;
  margin: 0px;
`;
