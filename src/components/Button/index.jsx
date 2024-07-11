import React from "react";
import { Container } from "./styled";

export const Button = ({ onClick, children }) => {
  return <Container onClick={onClick}>{children}</Container>;
};
