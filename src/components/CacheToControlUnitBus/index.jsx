import { BaseEdge } from "reactflow";
import {
  //  registerCacheId,
  cacheMemoryId,
  controlUnitId,
  controlUnitCacheId,
} from "../../containers/SimulatorSection/components";
import { usePosition } from "../../hooks/usePosition";

export const CacheToControlUnitBus = () => {
  const [edgePath] = usePosition({
    edgeId: controlUnitCacheId,
    sourceComponentId: cacheMemoryId,
    targetComponentId: controlUnitId,
  });

  return (
    <g>
      <BaseEdge
        path={edgePath}
        interactionWidth={20}
        style={{
          stroke: "var(--im-gray-lighter)",
          strokeWidth: 20,
        }}
      />
    </g>
  );
};
