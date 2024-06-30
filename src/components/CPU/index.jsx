import { useState } from "react";
import { Container } from "./styled";
import { Handle } from "reactflow";

export const CPU = () => {
  const initialRegisters = Array(256).fill("");
  const [registers, setRegisters] = useState(initialRegisters);

  return (
    <>
      <Container>
        <h1 style={{ margin: "0px" }}>CPU</h1>
      </Container>
    </>
  );
};