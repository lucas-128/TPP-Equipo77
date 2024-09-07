import { BaseEdge } from "reactflow";
import {
  cacheMemoryId,
  controlUnitId,
  controlUnitCacheId,
} from "../../../containers/SimulatorSection/components";
import { usePosition } from "../../../hooks/usePosition";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BusAnimation } from "../BusAnimation";

export const CacheToControlUnitBus = ({ id }) => {
  const executeAnimations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const animations = useSelector(
    (state) => state.application.fetch.edgeAnimation
  );

  const animationData = useMemo(() => {
    const combinedAnimations = [...animations, ...executeAnimations];
    return combinedAnimations.find((anim) => anim.id === controlUnitCacheId);
  }, [animations, executeAnimations, controlUnitCacheId]);

  const edgeAnimation = !!animationData;

  const [edgePath] = usePosition({
    edgeId: id,
    sourceComponentId: cacheMemoryId,
    targetComponentId: controlUnitId,
  });

  // Verde para distinguir que es sólo de datos
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
      {edgeAnimation && (
        <BusAnimation
          edgePath={edgePath}
          id={id}
          reverse={animationData.reverse}
        />
      )}
    </g>
  );
};
