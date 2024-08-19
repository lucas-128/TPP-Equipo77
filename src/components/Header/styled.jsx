import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  height: 30px;
  padding: 5px;
  background-color: var(--im-darkgray);
  border-bottom: 4px solid var(--im-primary);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
`;

export const HeaderTitle = styled.div`
  font-size: 15px;
  color: var(--im-lighgray);
  font-weight: 700;

`;
