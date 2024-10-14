import ReactFlow, { Controls, Background } from "reactflow";
import {
  onNodesChange,
  onEdgesChange,
  onConnect,
} from "../../slices/applicationSlice";
import { useState } from "react";
import "reactflow/dist/style.css";
import { Container } from "./styled";
import { nodeTypes, edgeTypes } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { AluModal } from "../../components/AluModal";
import { ControlUnitModal } from "../../components/ControlUnitModal";
import MainMemoryModal from "../../components/MainMemoryModal";
import { InstructionsModal } from "../../components/InstructionsModal";

export const SimulatorContainer = () => {
  const [colorMode, setColorMode] = useState("dark");
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
        edgeTypes={edgeTypes}
        onNodesChange={(changes) => dispatch(onNodesChange(changes))}
        onEdgesChange={(changes) => dispatch(onEdgesChange(changes))}
        onConnect={(connection) => dispatch(onConnect(connection))}
        onNodeClick={() => {}} // permite que se pueda hacer click al nodo
        onEdgeMouseEnter={() => {}}
        proOptions={proOptions}
        nodesDraggable={false}
        elementsSelectable={true}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        fitView
        minZoom={0.4}
        colorMode={colorMode}
      >
        <Controls showInteractive={false} />
        <Background gap={20} />
      </ReactFlow>
      <AluModal />
      <ControlUnitModal />
      <MainMemoryModal />
      <InstructionsModal />
    </Container>
  );
};
