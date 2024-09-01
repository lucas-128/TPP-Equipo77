import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BaseEdge } from "reactflow";
import {
  aluId,
  registersId,
  aluRegistersId,
} from "../../../containers/SimulatorSection/components";
import { usePosition } from "../../../hooks/usePosition";
import { BusAnimation } from "../BusAnimation";

export const ALUToRegistersBus = ({ id }) => {
  const animations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const edgeAnimation = useMemo(
    () => animations.includes(aluRegistersId),
    [animations, aluRegistersId]
  );
  const [edgePath] = usePosition({
    edgeId: id,
    sourceComponentId: aluId,
    targetComponentId: registersId,
  });

  return (
    <g>
      <BaseEdge
        path={edgePath}
        interactionWidth={20}
        style={{
          stroke: "var(--im-gray-lighter)",
          strokeWidth: 30,
          filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5)) ",
        }}
      />
      {edgeAnimation && <BusAnimation edgePath={edgePath} id={id} />}
    </g>
  );
};
