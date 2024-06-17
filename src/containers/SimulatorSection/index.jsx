// import React from "react";

import { Bus } from "../../components/Bus";
import { MainMemory } from "../../components/MainMemory";
import { RegisterBox } from "../../components/RegisterBox";
import { Container } from "./styled";

export const SimulatorContainer = () => {
  return (
    <Container>
      <RegisterBox />
      {/* <Bus /> */}
      <MainMemory />
    </Container>
  );
};
