import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--im-white);
  background: var(--im-primary);
  width: 150px;
  height: 150px;
  clip-path: polygon(0 0, 100% 29%, 100% 67%, 0 100%, 0% 69%, 24% 48%, 0 29%);
  box-shadow: var(--im-shadow);

  cursor: pointer;

  &:hover {
    background-color: var(--im-primary-hover);
    box-shadow: var(--im-shadow-hover);
  }
`;
