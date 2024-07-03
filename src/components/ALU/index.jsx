import { Handle } from "reactflow";
import { Container } from "./styled";

export const ALU = () => {
  let input1 = "num1";
  let input2 = "num2";
  let output = "num3";

  return (
    <Container>
      <Handle type="target" position="left" style={{ background: "#555" }} />
      <Handle type="target" position="right" style={{ background: "#555" }} />
      ALU
      <Handle type="source" position="bottom" style={{ background: "#555" }} />
    </Container>
  );
};
