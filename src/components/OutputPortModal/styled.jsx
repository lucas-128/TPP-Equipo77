import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5px;
  height: 100%;
`;

export const Text = styled.p`
  margin: 0;
  user-select: none;
  font-size: 18px;
  font-weight: ${(props) => (props.$bold ? "bold" : "normal")};
`;

export const BodyContainer = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
`;
