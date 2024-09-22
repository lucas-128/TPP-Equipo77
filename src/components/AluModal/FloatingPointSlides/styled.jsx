import styled from "styled-components";

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  align-items: center;
  padding: 30px;
  margin-right: 20px;
  justify-content: center;
  color: var(--im-lightgray);
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
`;

export const Line = styled.div`
  background-color: var(--im-lightgray);
  height: 2px;
  margin: 10px 0;
  width: 100%;
`;

export const BitsRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RowOperation = styled(Row)`
  margin-bottom: 15px;
  align-items: center;
`;

export const SignBit = styled.span`
  color: lightgreen;
`;

export const ExponentBits = styled.span`
  color: teal;
`;

export const MantissaBits = styled.span`
  color: lightblue;
`;

export const ResultRows = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const OperationName = styled.div`
  border-radius: 15px;
  background-color: var(--im-white);
  padding: 5px 10px;
  color: var(--im-primary);
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

export const SlidesButtonsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const SlidesContainer = styled.div`
  min-height: 170px;
`;

export const Slide = styled.div``;
