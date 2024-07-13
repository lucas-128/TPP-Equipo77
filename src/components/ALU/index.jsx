import { aluId } from "../../containers/SimulatorSection/components";
import { Container, CustomHandle } from "./styled";

export const ALU = () => {
  let input1 = "num1";
  let input2 = "num2";
  let output = "num3";

  return (
    <Container id={aluId}>
      <CustomHandle type="target" position="left" style={{ background: "#555" }} />
      <CustomHandle type="target" position="left" style={{ background: "#555" }} />
      ALU
      <CustomHandle type="source" position="right" style={{ background: "#555" }} />
    </Container>
  );
};
