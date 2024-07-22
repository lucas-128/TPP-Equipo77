import React from "react";
import { Container } from "./styled";

export const Button = ({ onClick, lightColor, children }) => {

  return (
    <Container onClick={onClick} $lightColor={lightColor}>
      {children}
    </Container>
  );
};
