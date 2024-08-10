import React, { useMemo } from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import {
  onNodesChange,
  onEdgesChange,
  onConnect,
} from "../../slices/applicationSlice";

import "reactflow/dist/style.css";
import { Container } from "./styled";
import { nodeTypes, edgeTypes } from "./components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AluModal } from "../../components/AluModal";

export const SimulatorContainer = () => {
  const nodes = useSelector((state) => state.application.execute.nodes);
  const edges = useSelector((state) => state.application.execute.edges);
  const proOptions = { hideAttribution: true };
  const dispatch = useDispatch();

  return (
    <Container>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={(changes) => dispatch(onNodesChange(changes))}
        onEdgesChange={(changes) => dispatch(onEdgesChange(changes))}
        onConnect={(connection) => dispatch(onConnect(connection))}
        onNodeClick={() => {}} // permite que se pueda hacer click al nodo
        proOptions={proOptions}
        fitView
        nodesDraggable={false}
        elementsSelectable={true}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
      >
        <Controls showInteractive={false} />
        <Background gap={10} size={1} />
      </ReactFlow>
      <AluModal />
    </Container>
  );
};
