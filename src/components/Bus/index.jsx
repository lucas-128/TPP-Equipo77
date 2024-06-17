import {
  VerticalSection,
  Byte,
  VerticalProgressColor,
  HorizontalSection,
  HorizontalProgressColor,
} from "./styled";

export const Bus = () => {
  return (
    <>
      <VerticalSection>
        <VerticalProgressColor>
          <Byte />
          <Byte />
          <Byte />
        </VerticalProgressColor>
      </VerticalSection>
      <HorizontalSection>
        <HorizontalProgressColor />
      </HorizontalSection>
    </>
  );
};
