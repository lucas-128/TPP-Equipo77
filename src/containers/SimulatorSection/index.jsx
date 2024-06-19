import React from "react";
import ReactFlow from "reactflow";

import { Bus } from "../../components/Bus";
import { MainMemory } from "../../components/MainMemory";
import { RegisterBox } from "../../components/RegisterBox";
import { Container } from "./styled";
import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Registros" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "Memoria principal" } },
];

const nodeTypes = {
  register: RegisterBox,
};

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
export const SimulatorContainer = () => {
  return (
    <Container>
      <ReactFlow nodes={nodeTypes} edges={initialEdges} />
      {/* <RegisterBox /> */}
      {/* <Bus /> */}
      {/* <MainMemory /> */}
    </Container>
  );
};
