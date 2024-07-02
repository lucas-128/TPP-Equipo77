import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
  padding: 5px;
  background-color: #272727;
  border-bottom: 2px solid var(--im-secondary);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
`;

export const HeaderTitle = styled.div`
  font-size: 15px;
  color: var(--im-lighgray);
  font-weight: 700;

`;
