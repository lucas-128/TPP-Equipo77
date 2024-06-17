import { ArrowContainer, ArrowStart, Byte, ProgressColor } from "./styled";

export const Bus = () => {
  return (
    <ArrowContainer>
      <ArrowStart>
        <ProgressColor>
          <Byte />
          <Byte />
          <Byte />
        </ProgressColor>
      </ArrowStart>
    </ArrowContainer>
  );
};
