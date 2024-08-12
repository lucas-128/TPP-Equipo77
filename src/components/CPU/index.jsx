import { useState } from "react";
import { Container } from "./styled";

export const CPU = () => {
  const initialRegisters = Array(256).fill("");
  const [registers, setRegisters] = useState(initialRegisters);

  return (
    <>
      <Container>
        <h1
          style={{
            margin: "0px",
            fontSize: "45px",
          }}
        >
          CPU
        </h1>
      </Container>
    </>
  );
};
