import { useSelector } from "react-redux";
import { BaseEdge } from "reactflow";
import {
  controlUnitId,
  controlUnitCacheAddrBusId,
  cacheMemoryId,
} from "../../../containers/SimulatorSection/components";
import { useMemo } from "react";
import { usePosition } from "../../../hooks/usePosition";
import { BusAnimation } from "../BusAnimation";

export const ControlToCacheAddrBus = ({ id }) => {
  const animations = useSelector(
    (state) => state.application.fetch.edgeAnimation
  );

  const executeAnimations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const edgeAnimation = useMemo(
    () =>
      animations.includes(controlUnitCacheAddrBusId) ||
      executeAnimations.includes(controlUnitCacheAddrBusId),
    [animations, executeAnimations, controlUnitCacheAddrBusId]
  );

  const [edgePath] = usePosition({
    edgeId: id,
    sourceComponentId: controlUnitId,
    targetComponentId: cacheMemoryId,
  });

  // Roja para distinguir que es sólo de address
  return (
    <g>
      <BaseEdge
        path={edgePath}
        interactionWidth={20}
        style={{
          stroke: "hsl(120, 10.769230769230772%, 74.50980392156863%)",
          strokeWidth: 30,
          filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))",
        }}
      />
      {edgeAnimation && <BusAnimation edgePath={edgePath} id={id} />}
    </g>
  );
};
