import React, { useMemo } from "react";
import { Container, Content, Title } from "./styled";

export const Globe = ({ id, arrowPosition, children, title }) => {

  const directionArrow = {
    left: { top: "50%", left: "0px" },
    right: { top: "50%", left: "88%" },
    bottom: { top: "90%", left: "45%" },
    top: { top: "-5px", left: "40%" },
  };

  return (
    <Container key={id + "_globe"} $direction={directionArrow[arrowPosition]}>
      <Content>
        <Title>{title}</Title>
        {children}
      </Content>
    </Container>
  );
};
