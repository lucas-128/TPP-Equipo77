import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: absolute;
  right: 20px;
  bottom: 20px;
  height: 50px;
  width: 50px;
  z-index: 5;
  color: var(--im-lightgray);
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
