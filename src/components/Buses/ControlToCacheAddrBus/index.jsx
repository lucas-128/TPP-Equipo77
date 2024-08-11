import { useSelector } from "react-redux";
import { BaseEdge } from "reactflow";
import {
  controlUnitId,
  mainMemoryId,
  aluRegistersId,
  cacheMemoryId,
} from "../../../containers/SimulatorSection/components";
import { useMemo } from "react";
import { usePosition } from "../../../hooks/usePosition";
import { BusAnimation } from "../BusAnimation";

export const ControlToCacheAddrBus = ({ id }) => {
  const animations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const edgeAnimation = useMemo(
    () => animations.includes(aluRegistersId),
    [animations, aluRegistersId]
  );

  const [edgePath] = usePosition({
    edgeId: id,
    sourceComponentId: cacheMemoryId,
    targetComponentId: controlUnitId,
  });

  // Roja para distinguir que es sólo de address
  return (
    <g>
      <BaseEdge
        path={edgePath}
        interactionWidth={20}
        style={{
          stroke: "hsl(0, 50%, 65%)",
          strokeWidth: 20,
          filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))",
        }}
      />
      {edgeAnimation && <BusAnimation edgePath={edgePath} id={id} />}
    </g>
  );
};
