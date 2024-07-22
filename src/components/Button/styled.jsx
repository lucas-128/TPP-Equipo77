import styled from "styled-components";

export const Container = styled.div`
  border: none;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  height: 30px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  user-select: none;
  padding: 4px 10px;
  color: ${(props) => props.$lightColor ? 'var(--im-primary)' : 'var(--im-lightgray)'};
  background-color:${(props) => props.$lightColor ? 'var(--im-lightgray)' : 'var(--im-primary)'};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: all 0.10s;

  &:hover {
    background-color: var(--im-secondary);
    color: var(--im-lightgray);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;
