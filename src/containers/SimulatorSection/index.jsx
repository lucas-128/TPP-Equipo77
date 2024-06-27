import React, { useMemo } from "react";
import ReactFlow from "reactflow";
import {
  onNodesChange,
  onEdgesChange,
  onConnect,
} from "../../slices/applicationSlice";

import "reactflow/dist/style.css";
import { Container } from "./styled";
import { nodeTypes } from "./components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const SimulatorContainer = () => {
  const nodes = useSelector((state) => state.application.nodes);
  const edges = useSelector((state) => state.application.edges);
  const proOptions = { hideAttribution: true };
  const dispatch = useDispatch();
  return (
    <Container>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={(changes) => dispatch(onNodesChange(changes))}
        onEdgesChange={(changes) => dispatch(onEdgesChange(changes))}
        onConnect={(connection) => dispatch(onConnect(connection))}
        proOptions={proOptions}
        fitView
      />
    </Container>
  );
};
